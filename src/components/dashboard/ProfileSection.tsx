import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { type Tables } from '@/integrations/supabase/types';

interface ProfileSectionProps {
    profile: Tables<'profiles'> | null | undefined;
    email: string | undefined;
}

const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('');
};

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile, email }) => {
    return (
        <Card className="bg-[#1a1a1a] border-gold/20">
            <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                    <User />
                    Profile
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-gold">
                        <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.full_name ?? 'User avatar'} />
                        <AvatarFallback className="bg-muted text-foreground">{getInitials(profile?.full_name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-xl font-semibold">{profile?.full_name || 'No name provided'}</p>
                        <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfileSection;
