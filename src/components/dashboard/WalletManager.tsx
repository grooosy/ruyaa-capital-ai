import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Plus } from 'lucide-react';
import { type Tables } from '@/integrations/supabase/types';

interface WalletManagerProps {
    wallets: Tables<'wallets'>[] | null | undefined;
}

const getChainIcon = (chain: string) => {
    // Simple emoji representation for now
    switch (chain.toLowerCase()) {
        case 'btc': return '₿';
        case 'eth': return 'Ξ';
        case 'xrp': return '✕';
        default: return '🪙';
    }
}

const WalletManager: React.FC<WalletManagerProps> = ({ wallets }) => {
    return (
        <Card className="bg-[#1a1a1a] border-gold/20">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-gold flex items-center gap-2">
                        <Wallet />
                        My Wallets
                    </CardTitle>
                    <CardDescription>Manage your crypto wallets for deposits.</CardDescription>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add Wallet
                </Button>
            </CardHeader>
            <CardContent>
                {wallets && wallets.length > 0 ? (
                    <div className="space-y-2">
                        {wallets.map((wallet) => (
                            <div key={wallet.id} className="flex justify-between items-center p-2 rounded-md bg-background/50">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{getChainIcon(wallet.chain)}</span>
                                    <div>
                                        <p className="font-semibold uppercase">{wallet.chain}</p>
                                        <p className="text-sm text-muted-foreground break-all">{wallet.address}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No wallets added yet.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default WalletManager;
