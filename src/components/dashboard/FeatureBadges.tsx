
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings } from 'lucide-react';
import { type Tables } from '@/integrations/supabase/types';

interface FeatureBadgesProps {
    features: Tables<'user_features'>[] | null | undefined;
}

const FeatureBadges: React.FC<FeatureBadgesProps> = ({ features }) => {
    return (
        <Card className="bg-[#1a1a1a] border-gold/20">
            <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                    <Settings />
                    Active Features
                </CardTitle>
            </CardHeader>
            <CardContent>
                {features && features.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {features.map((feature) => (
                            <Badge key={feature.feature} variant="secondary" className="text-base bg-gold/20 text-gold border-gold/50">
                                {feature.feature.toUpperCase()}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No active features.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default FeatureBadges;
