
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Wallet } from 'lucide-react';

interface AuthProps {
    onSuccess?: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (!onSuccess) return;

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                onSuccess();
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, [onSuccess]);

    const handleSolanaSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'solana' as any,
            options: {
                redirectTo: `${window.location.origin}/`,
            },
        });
        if (error) {
            toast.error("Solana sign-in failed", {
                description: error.message,
            });
            console.error('Solana sign-in error:', error);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <SupabaseAuth
                supabaseClient={supabase}
                providers={['google']}
                localization={{
                    variables: {
                        sign_in: {
                            email_label: t('email'),
                            password_label: t('password'),
                            button_label: t('sign_in'),
                        },
                        sign_up: {
                            email_label: t('email'),
                            password_label: t('password'),
                            button_label: t('sign_up'),
                        },
                        forgotten_password: {
                            link_text: t('forgot_password'),
                        },
                    },
                }}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#d4af37',
                                brandAccent: '#b89b3e',
                            },
                        },
                    },
                }}
                theme="dark"
            />
            <div className="relative flex pt-6 pb-3 items-center">
                <div className="flex-grow border-t border-zinc-700"></div>
                <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase">Or</span>
                <div className="flex-grow border-t border-zinc-700"></div>
            </div>
            <Button
                variant="outline"
                className="w-full bg-transparent border-gold text-gold hover:bg-gold/10 hover:text-gold"
                onClick={handleSolanaSignIn}
            >
                <Wallet className="mr-2 h-4 w-4" />
                Sign in with Solana Wallet
            </Button>
        </div>
    );
};
