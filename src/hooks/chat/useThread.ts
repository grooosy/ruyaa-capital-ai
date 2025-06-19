import { useQuery } from '@tanstack/react-query';
import { AgentId } from '@/context/ChatContext';
import { getOrCreateThread } from '@/services/chatService';

export const useThread = (userId: string | undefined, selectedAgent: AgentId | undefined) => {
  const { data: thread, isLoading: isLoadingThread } = useQuery({
    queryKey: ['thread', userId, selectedAgent],
    queryFn: async () => {
      if (!userId || !selectedAgent) return null;
      const thr = await getOrCreateThread(userId, selectedAgent);
      return thr;
    },
    enabled: !!userId && !!selectedAgent,
    staleTime: Infinity,
  });

  return {
    thread,
    threadId: thread?.id,
    isLoadingThread,
  };
};
