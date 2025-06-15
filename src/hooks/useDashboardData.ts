
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

const fetchDashboardData = async (session: Session | null) => {
    if (!session?.user.id) {
        return null;
    }
    const userId = session.user.id;

    const profilePromise = supabase.from('profiles').select('full_name, avatar_url').eq('id', userId).single();
    const featuresPromise = supabase.from('user_features').select('feature, activated_at').eq('user_id', userId);
    const sessionsPromise = supabase.from('arbitrage_sessions').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    const walletsPromise = supabase.from('wallets').select('*').eq('user_id', userId);
    
    const [
        { data: profile, error: profileError },
        { data: features, error: featuresError },
        { data: sessions, error: sessionsError },
        { data: wallets, error: walletsError },
    ] = await Promise.all([profilePromise, featuresPromise, sessionsPromise, walletsPromise]);

    if (profileError && profileError.code !== 'PGRST116') console.error('Error fetching profile:', profileError.message);
    if (featuresError) console.error('Error fetching features:', featuresError.message);
    if (sessionsError) console.error('Error fetching sessions:', sessionsError.message);
    if (walletsError) console.error('Error fetching wallets:', walletsError.message);

    return {
        profile,
        features,
        sessions,
        wallets,
    };
};

export const useDashboardData = (session: Session | null) => {
    return useQuery({
        queryKey: ['dashboardData', session?.user.id],
        queryFn: () => fetchDashboardData(session),
        enabled: !!session?.user.id,
    });
};
