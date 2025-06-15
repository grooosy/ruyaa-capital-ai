
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';

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
        </div>
    );
};
