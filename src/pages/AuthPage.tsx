
import { Auth } from "@/components/Auth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";

const AuthPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                navigate('/');
            }
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                navigate('/');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);

    return (
        <div className="relative min-h-screen">
            <ParticleBackground />
            <Navbar />
            <div className="w-full h-screen flex items-center justify-center">
                <Auth />
            </div>
        </div>
    );
};

export default AuthPage;
