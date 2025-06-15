
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useToast } from '@/hooks/use-toast';

interface AuthProps {
    onSuccess?: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
    const { t } = useTranslation();
    const { setVisible: setWalletModalVisible } = useWalletModal();
    const { connected, publicKey, disconnect, connecting } = useWallet();
    const { toast } = useToast();

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

    const handleWalletAuth = async () => {
        if (!connected || !publicKey) {
            setWalletModalVisible(true);
            return;
        }

        try {
            const walletAddress = publicKey.toBase58();

            // Check if user exists with this wallet - use any type to bypass TypeScript issues
            const { data: existingProfile } = await supabase
                .from('profiles')
                .select('*')
                .eq('wallet_address', walletAddress)
                .maybeSingle() as { data: any };

            if (existingProfile && existingProfile.email) {
                // Sign in existing user
                const { error } = await supabase.auth.signInWithPassword({
                    email: existingProfile.email,
                    password: walletAddress
                });

                if (error) throw error;
            } else {
                // Create new user
                const { error } = await supabase.auth.signUp({
                    email: `${walletAddress}@wallet.local`,
                    password: walletAddress,
                    options: {
                        data: {
                            full_name: `Wallet User`,
                            wallet_address: walletAddress,
                        },
                    },
                });

                if (error) throw error;
            }

            toast({
                title: "Wallet connected!",
                description: "Successfully authenticated with wallet",
            });
        } catch (error: any) {
            console.error("Wallet auth error:", error);
            toast({
                title: "Authentication failed",
                description: error.message || "Failed to authenticate with wallet",
                variant: "destructive",
            });
        }
    };

    // Auto-authenticate when wallet connects
    useEffect(() => {
        if (connected && publicKey) {
            handleWalletAuth();
        }
    }, [connected, publicKey]);

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
                <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase">Or connect with</span>
                <div className="flex-grow border-t border-zinc-700"></div>
            </div>
            
            {connected && publicKey ? (
                 <div className="flex flex-col items-center gap-4 w-full">
                    <p className="text-xs text-zinc-400 text-center">
                        Connected with wallet: <br/>
                        <span className="font-mono text-zinc-300">{publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}</span>
                    </p>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => disconnect()}
                    >
                        Disconnect Wallet
                    </Button>
                </div>
            ) : (
                <Button
                    className="w-full font-bold text-lg h-12 bg-gradient-to-br from-gold to-primary-accent text-dark-charcoal shadow-gold-glow hover:shadow-green-glow transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => setWalletModalVisible(true)}
                    disabled={connecting}
                >
                    <Wallet className="mr-3 h-5 w-5" />
                    {connecting ? 'Connecting...' : 'Sign in with Crypto Wallet'}
                </Button>
            )}
        </div>
    );
};
