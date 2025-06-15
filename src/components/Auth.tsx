
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

export const Auth = () => {
    const { t } = useTranslation();

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
