import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp } from 'lucide-react';
import { type Tables } from '@/integrations/supabase/types';
import { formatDistanceToNow } from 'date-fns';

interface ArbitrageStatusProps {
    sessions: Tables<'arbitrage_sessions'>[] | null | undefined;
}

const getStatusVariant = (status: string | null) => {
    switch (status) {
        case 'active': return 'bg-green-500/20 text-green-400 border-green-500/50';
        case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
        case 'closed': return 'bg-red-500/20 text-red-400 border-red-500/50';
        default: return 'secondary';
    }
};

const ArbitrageStatus: React.FC<ArbitrageStatusProps> = ({ sessions }) => {
    return (
        <Card className="bg-[#1a1a1a] border-gold/20">
            <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                    <ArrowUp />
                    Arbitrage Sessions
                </CardTitle>
                <CardDescription>Your recent arbitrage trading sessions.</CardDescription>
            </CardHeader>
            <CardContent>
                {sessions && sessions.length > 0 ? (
                    <div className="space-y-4">
                        {sessions.slice(0, 3).map((session) => (
                            <div key={session.id} className="flex justify-between items-center p-2 rounded-md bg-background/50">
                                <div>
                                    <p className="font-semibold">${session.amount_usd} ({session.duration_days} days)</p>
                                    <p className="text-sm text-muted-foreground">
                                        Mode: {session.mode} | Started {session.created_at ? formatDistanceToNow(new Date(session.created_at), { addSuffix: true }) : ''}
                                    </p>
                                </div>
                                <Badge className={getStatusVariant(session.status)}>{session.status?.toUpperCase()}</Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No arbitrage sessions found.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default ArbitrageStatus;
