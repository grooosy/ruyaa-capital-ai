import React, { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useDashboardData } from '@/hooks/useDashboardData';
import ProfileSection from '@/components/dashboard/ProfileSection';
import FeatureBadges from '@/components/dashboard/FeatureBadges';
import ArbitrageStatus from '@/components/dashboard/ArbitrageStatus';
import WalletManager from '@/components/dashboard/WalletManager';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';

const DashboardPage = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loadingSession, setLoadingSession] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/auth');
            } else {
                setSession(session);
            }
            setLoadingSession(false);
        };
        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                navigate('/auth');
            } else {
                setSession(session);
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    const { data: dashboardData, isLoading: isLoadingData } = useDashboardData(session);

    if (loadingSession || isLoadingData || !session) {
        return <DashboardSkeleton />;
    }
    
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="container mx-auto px-4 py-24">
                <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-gold mb-8">My Dashboard</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-8">
                        <ProfileSection profile={dashboardData?.profile} email={session.user.email} />
                        <FeatureBadges features={dashboardData?.features} />
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                        <ArbitrageStatus sessions={dashboardData?.sessions} />
                        <WalletManager wallets={dashboardData?.wallets} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
