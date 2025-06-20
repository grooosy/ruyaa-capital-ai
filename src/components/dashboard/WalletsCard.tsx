
import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { type Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WalletsCardProps {
  wallets: Tables<"wallets">[] | null | undefined;
  onAddWallet: () => void;
}

const getChainIcon = (chain: string) => {
  switch (chain.toLowerCase()) {
    case "btc":
      return (
        <span className="text-white text-lg" title="BTC">
          ₿
        </span>
      );
    case "eth":
      return (
        <span className="text-white text-lg" title="ETH">
          Ξ
        </span>
      );
    case "xrp":
      return (
        <span className="text-white text-base" title="XRP">
          ✕
        </span>
      );
    case "sol":
      return (
        <span className="text-green-400 text-lg" title="SOL">
          ◎
        </span>
      );
    default:
      return (
        <span className="text-green-300 text-xl" title={chain}>
          🪙
        </span>
      );
  }
};

function truncateMiddle(address: string, chars = 6) {
  if (!address) return "";
  const left = address.slice(0, chars);
  const right = address.slice(-chars);
  return `${left}...${right}`;
}

const WalletsCard: React.FC<WalletsCardProps> = ({ wallets, onAddWallet }) => {
  const { connected, publicKey } = useWallet();
  const { setVisible: setWalletModalVisible } = useWalletModal();
  const { toast } = useToast();

  const handleConnectWallet = async () => {
    try {
      if (!connected || !publicKey) {
        // Open wallet modal to connect
        setWalletModalVisible(true);
        return;
      }

      // If already connected, add wallet to user's collection
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to add a wallet",
          variant: "destructive",
        });
        return;
      }

      const walletAddress = publicKey.toBase58();

      // Check if wallet already exists
      const existingWallet = wallets?.find(w => w.address === walletAddress && w.chain === 'SOL');
      if (existingWallet) {
        toast({
          title: "Wallet already added",
          description: `This SOL wallet is already in your collection`,
        });
        return;
      }

      // Add wallet to wallets table
      const { error } = await supabase
        .from('wallets')
        .insert({
          user_id: session.user.id,
          address: walletAddress,
          chain: 'SOL',
        });

      if (error) {
        console.error("Error adding wallet:", error);
        toast({
          title: "Error",
          description: "Failed to add wallet. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Wallet added",
        description: `Successfully added wallet ${truncateMiddle(walletAddress)}`,
      });

      // Refresh page to show new wallet
      window.location.reload();
    } catch (error) {
      console.error("Connect wallet error:", error);
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
      transition={{ type: "spring", stiffness: 50 }}
      className="relative bg-[#1A1A1A] backdrop-blur-sm rounded-xl p-6 overflow-hidden focus-within:ring-2 focus-within:ring-green-400 outline-none group"
      tabIndex={0}
      aria-label="Wallet manager"
    >
      <div className="absolute inset-0 bg-black/40 blur-xl -z-10" aria-hidden />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-green-800/20 w-7 h-7 flex items-center justify-center">
            <Plus className="w-5 h-5 text-green-400" strokeWidth={2.3} />
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">My Wallets</h3>
        </div>
        <Button
          onClick={handleConnectWallet}
          className="rounded-full px-4 py-2 font-semibold text-base inline-flex items-center gap-2"
          tabIndex={0}
          aria-label="Add wallet"
        >
          <Plus className="w-4 h-4" />
          {connected ? "Add This Wallet" : "Connect Wallet"}
        </Button>
      </div>
      <div>
        {wallets && wallets.length > 0 ? (
          <div className="space-y-2">
            {wallets.map((wallet) => (
              <div key={wallet.id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-[#141419] border border-green-500/10 hover:border-green-400/40 transition">
                <span className="rounded-full w-8 h-8 flex items-center justify-center bg-green-800/20 shadow-inner ring-2 ring-green-400 mr-2">
                  {getChainIcon(wallet.chain)}
                </span>
                <span className="font-medium uppercase text-white text-sm">{wallet.chain}</span>
                <span className="text-green-200 text-xs font-mono ml-2">{truncateMiddle(wallet.address, 6)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-green-100">No wallets added yet.</p>
        )}
      </div>
    </motion.div>
  );
};

export default WalletsCard;
