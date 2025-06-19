import { useCallback } from 'react';
import { useAiResponse } from './useAiResponse';

interface UseMessageSubmissionProps {
  threadId: string | undefined;
  selectedAgent: any;
  userId: string | undefined;
  session: any;
  addMessageMutation: any;
  logUsage: (userId: string, agent: any, role: 'user' | 'assistant', content: string) => void;
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
