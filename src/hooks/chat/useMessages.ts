import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Message } from '@/types/chat';
import { AgentId } from '@/context/ChatContext';
import { getMessages, addMessage, logAgentUsage } from '@/services/chatService';
import { getInitialMessage } from '@/config/agentConfig';
import { supabase } from '@/integrations/supabase/client';

export const useMessages = (
  threadId: string | undefined,
  selectedAgent: AgentId | undefined,
  userProfile: { full_name?: string } | null | undefined
) => {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading: isLoadingMessages } = useQuery<Message[]>({
    queryKey: ['messages', threadId],
    queryFn: () => getMessages(threadId!),
    enabled: !!threadId,
    select: (data) => {
      if (!selectedAgent) return [];
      if (!data || data.length === 0) {
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

  const logUsage = (userId: string, agent: AgentId, role: 'user' | 'assistant', content: string) => {
    logAgentUsage({
      user_id: userId,
      agent,
      msg_role: role,
      content,
    });
  };

  // Real-time message listening
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
    isLoadingMessages,
    addMessageMutation,
    logUsage,
  };
};
