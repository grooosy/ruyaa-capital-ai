
import { useChatContext, AgentId } from '@/context/ChatContext';
import { useAuthState } from './chat/useAuthState';
import { useThread } from './chat/useThread';
import { useMessages } from './chat/useMessages';
import { useChatInput } from './chat/useChatInput';
import { useMessageSubmission } from './chat/useMessageSubmission';

export const useChat = (agentIdOverride?: AgentId) => {
  const { selectedAgent: agentFromContext } = useChatContext();
  const selectedAgent = agentIdOverride !== undefined ? agentIdOverride : agentFromContext;

  // Use the smaller hooks
  const { session, userId, userProfile, authRequired, setAuthRequired, clearAuthRequired } = useAuthState();
  const { threadId, isLoadingThread } = useThread(userId, selectedAgent);
  const { messages, isLoadingMessages, addMessageMutation, logUsage } = useMessages(threadId, selectedAgent, userProfile);

  const { submitMessage, isSubmitting } = useMessageSubmission({
    threadId,
    selectedAgent,
    userId,
    session,
    addMessageMutation,
    logUsage,
    setAuthRequired,
  });

  const {
    input,
    setInput,
    handleInputChange,
    clearInput,
    handleVoiceRecording,
    handleFileUpload,
    isRecording,
    isUploading,
  } = useChatInput(submitMessage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = input;
    const success = await submitMessage(userMessage);
    if (success) {
      clearInput();
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading: isLoadingThread || isLoadingMessages || isSubmitting,
    handleInputChange,
    handleSubmit,
    handleVoiceRecording,
    handleFileUpload,
    isRecording,
    isUploading,
    authRequired,
    clearAuthRequired,
    session,
  };
};
