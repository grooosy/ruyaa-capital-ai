import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuthState = () => {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [authRequired, setAuthRequired] = useState(false);

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

  return {
    session,
    userId,
    userProfile,
    authRequired,
    setAuthRequired,
    clearAuthRequired: () => setAuthRequired(false),
  };
};
