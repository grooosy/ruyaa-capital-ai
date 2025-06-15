
import { useState } from 'react';
import { useChatContext, AgentId } from '@/context/ChatContext';
import OpenAI from 'openai';
import { Message } from '@/types/chat';
import { fetchAiResponse, getFallbackResponse } from '@/services/aiService';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthState } from './chat/useAuthState';
import { useThread } from './chat/useThread';
import { useMessages } from './chat/useMessages';
import { useChatInput } from './chat/useChatInput';

const openRouterApiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

export const useChat = (agentIdOverride?: AgentId) => {
  const { selectedAgent: agentFromContext } = useChatContext();
  const queryClient = useQueryClient();
  
  const selectedAgent = agentIdOverride !== undefined ? agentIdOverride : agentFromContext;
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Use the smaller hooks
  const { session, userId, userProfile, authRequired, setAuthRequired, clearAuthRequired } = useAuthState();
  const { threadId, isLoadingThread } = useThread(userId, selectedAgent);
  const { messages, isLoadingMessages, addMessageMutation, logUsage } = useMessages(threadId, selectedAgent, userProfile);
  const { input, handleInputChange, clearInput, handleVoiceRecording, handleFileUpload } = useChatInput();

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
    clearInput();

    await addMessageMutation.mutateAsync({ thread_id: threadId, role: 'user', content: userMessageContent });
    if (selectedAgent) {
      logUsage(userId, selectedAgent, 'user', userMessageContent);
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
        logUsage(userId, selectedAgent, 'assistant', botResponseContent);
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

  return {
    messages,
    input,
    isLoading: isLoadingThread || isLoadingMessages || isAiLoading || addMessageMutation.isPending,
    handleInputChange,
    handleSubmit,
    handleVoiceRecording,
    handleFileUpload,
    authRequired,
    clearAuthRequired,
    session,
  };
};
