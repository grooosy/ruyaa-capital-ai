
import { useCallback } from 'react';
import { useAiResponse } from './useAiResponse';

import { AgentId } from '@/context/ChatContext';
import type { UseMutationResult } from '@tanstack/react-query';
import type { Message } from '@/types/chat';

interface UseMessageSubmissionProps {
  threadId: string | undefined;
  selectedAgent: AgentId | undefined;
  userId: string | undefined;
  session: unknown;
  addMessageMutation: UseMutationResult<
    Message,
    unknown,
    { thread_id: string; role: 'user' | 'assistant'; content: string }
  >;
  logUsage: (
    userId: string,
    agent: AgentId | undefined,
    role: 'user' | 'assistant',
    content: string
  ) => void;
  setAuthRequired: (required: boolean) => void;
}

export const useMessageSubmission = ({
  threadId,
  selectedAgent,
  userId,
  session,
  addMessageMutation,
  logUsage,
  setAuthRequired,
}: UseMessageSubmissionProps) => {
  const { isAiLoading, generateResponse } = useAiResponse();

  const submitMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || isAiLoading || addMessageMutation.isPending) {
      return false;
    }

    if (!session || !userId) {
      setAuthRequired(true);
      return false;
    }
    
    if (!threadId) {
      console.error("Thread not ready or supported for this agent.");
      return false;
    }

    // Add user message
    await addMessageMutation.mutateAsync({ 
      thread_id: threadId, 
      role: 'user', 
      content: userMessage 
    });
    
    if (selectedAgent) {
      logUsage(userId, selectedAgent, 'user', userMessage);
    }

    // Generate AI response
    await generateResponse(
      threadId,
      selectedAgent,
      userId,
      userMessage,
      addMessageMutation,
      logUsage
    );

    return true;
  }, [
    threadId,
    selectedAgent,
    userId,
    session,
    addMessageMutation,
    logUsage,
    setAuthRequired,
    isAiLoading,
    generateResponse,
  ]);

  return {
    submitMessage,
    isSubmitting: isAiLoading || addMessageMutation.isPending,
  };
};
