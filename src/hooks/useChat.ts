import { useState, useEffect } from 'react';
import { useChatContext, AgentId } from '@/context/ChatContext';
import OpenAI from 'openai';
import { Message } from '@/types/chat';
import { getInitialMessage } from '@/config/agentConfig';
import { fetchAiResponse, getFallbackResponse } from '@/services/aiService';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Session } from '@supabase/supabase-js';
import { getOrCreateThread, getMessages, addMessage, logAgentUsage } from '@/services/chatService';

const openRouterApiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

export const useChat = (agentIdOverride?: AgentId) => {
  const { selectedAgent: agentFromContext } = useChatContext();
  const queryClient = useQueryClient();
  
  const selectedAgent = agentIdOverride !== undefined ? agentIdOverride : agentFromContext;

  const [session, setSession] = useState<Session | null>(null);
  const [authRequired, setAuthRequired] = useState(false);
  const [input, setInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        const newUserId = session?.user?.id;
        const oldUserId = session?.user?.id;
        if (newUserId !== oldUserId) {
             queryClient.invalidateQueries({queryKey: ['conversation']});
        }
        setSession(session);
        if(session) setAuthRequired(false);
    });
    return () => subscription.unsubscribe();
  }, [queryClient]);

  const userId = session?.user?.id;

  // Fetch user profile for personalized greetings
  const { data: userProfile } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .single();
      return data;
    },
    enabled: !!userId,
  });

  // CASCADE: get/create the thread
  const { data: thread, isLoading: isLoadingThread } = useQuery({
      queryKey: ['thread', userId, selectedAgent],
      queryFn: async () => {
          if (!userId || !selectedAgent) return null;
          // Use fetch-or-create to guarantee uniqueness
          const thr = await getOrCreateThread(userId, selectedAgent);
          return thr;
      },
      enabled: !!userId && !!selectedAgent,
      staleTime: Infinity,
  });

  const threadId = thread?.id;

  const { data: messages = [], isLoading: isLoadingMessages } = useQuery<Message[]>({
      queryKey: ['messages', threadId],
      queryFn: () => getMessages(threadId!),
      enabled: !!threadId,
      select: (data) => {
          if (!selectedAgent) return [];
          if (!data || data.length === 0) {
              // Pass user's first name to the initial message
              const userName = userProfile?.full_name?.split(' ')[0];
              return [getInitialMessage(selectedAgent, userName)];
          }
          return data;
      }
  });
  
  const addMessageMutation = useMutation({
    mutationFn: addMessage,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['messages', threadId]});
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAiLoading || addMessageMutation.isPending) return;

    if (!session || !userId) {
        setAuthRequired(true);
        return;
    }
    
    if (!threadId) {
        console.error("Thread not ready or supported for this agent.");
        return;
    }

    if (!openRouterApiKey) {
        const errorMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: "The OpenRouter API key is not configured. Please set the VITE_OPENROUTER_API_KEY in your project's environment variables."
        };
        addMessageMutation.mutate({ ...errorMessage, thread_id: threadId });
        return;
    }

    const userMessageContent = input;
    setInput('');

    await addMessageMutation.mutateAsync({ thread_id: threadId, role: 'user', content: userMessageContent });
    if (selectedAgent) {
        logAgentUsage({
            user_id: userId,
            agent: selectedAgent,
            msg_role: 'user',
            content: userMessageContent,
        });
    }
    setIsAiLoading(true);

    try {
      const currentMessages = await queryClient.fetchQuery<Message[]>({queryKey: ['messages', threadId]});
      let botResponseContent: string;

      if (selectedAgent) {
        botResponseContent = await fetchAiResponse(currentMessages, selectedAgent);
      } else {
        botResponseContent = await getFallbackResponse(userMessageContent);
      }
      
      await addMessageMutation.mutateAsync({ thread_id: threadId, role: 'assistant', content: botResponseContent });
      if (selectedAgent) {
          logAgentUsage({
              user_id: userId,
              agent: selectedAgent,
              msg_role: 'assistant',
              content: botResponseContent,
          });
      }
    } catch (error) {
      console.error("Error fetching bot response:", error);
      let errorMessageContent = "Sorry, I'm having trouble connecting. Please try again later.";
      if (error instanceof OpenAI.APIError) {
        errorMessageContent = `OpenRouter API Error: ${error.status} ${error.type} - ${error.message}`;
      }
      addMessageMutation.mutate({ thread_id: threadId, role: 'assistant', content: errorMessageContent });
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleVoiceRecording = () => {
    // Placeholder for voice recording logic
    console.log("Voice recording initiated.");
    alert("Voice recording is not yet implemented.");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Placeholder for file upload logic
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("File selected:", file.name);
      // In a real app, you would upload the file here.
      alert(`File "${file.name}" attached (upload functionality not implemented).`);
    }
  };

  // Example: Listen for real-time message inserts (optional)
  useEffect(() => {
    if (!threadId) return;
    const channel = supabase
      .channel('chat-messages-' + threadId)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `thread_id=eq.${threadId}`,
        },
        (payload) => {
          queryClient.invalidateQueries({queryKey: ['messages', threadId]});
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [threadId, queryClient]);

  return {
    messages,
    input,
    isLoading: isLoadingThread || isLoadingMessages || isAiLoading || addMessageMutation.isPending,
    handleInputChange,
    handleSubmit,
    handleVoiceRecording,
    handleFileUpload,
    authRequired,
    clearAuthRequired: () => setAuthRequired(false),
    session,
  };
};
