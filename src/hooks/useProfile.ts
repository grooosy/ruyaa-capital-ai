
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

const fetchProfile = async (session: Session | null) => {
  if (!session?.user.id) {
    return null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error.message);
    // Don't throw, as a missing profile is not necessarily an application error.
    return null;
  }

  return data;
};

export const useProfile = (session: Session | null) => {
  return useQuery({
    queryKey: ['profile', session?.user.id],
    queryFn: () => fetchProfile(session),
    enabled: !!session?.user.id,
  });
};
