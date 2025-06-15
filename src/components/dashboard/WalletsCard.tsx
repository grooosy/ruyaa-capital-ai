
import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { type Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";

interface WalletsCardProps {
  wallets: Tables<"wallets">[] | null | undefined;
  onAddWallet: () => void;
}

// Parse wallet from wallet login storage if available
function getSessionWallet() {
  if (typeof window !== "undefined")
    return sessionStorage.getItem("wallet_login");
  return null;
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
  // If logged in via wallet, show it over list
  const sessionWallet = getSessionWallet();
  if (sessionWallet) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, boxShadow: "0 0 28px #00FF9D99" }}
        transition={{ type: "spring", stiffness: 50 }}
        className="relative bg-[#1A1A1A] backdrop-blur-sm rounded-xl p-6 overflow-hidden focus-within:ring-2 focus-within:ring-green-400 outline-none group"
        tabIndex={0}
        aria-label="Wallet manager"
      >
        <div className="absolute inset-0 bg-green-500/10 blur-2xl -z-10" aria-hidden />
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-green-500/10 w-7 h-7 flex items-center justify-center shadow-green-glow">
              <Plus className="w-5 h-5 text-green-400 drop-shadow-[0_0_7px_#00FF9D]" strokeWidth={2.3} />
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">My Wallets</h3>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 py-2 px-3 rounded-lg bg-[#141419] border border-green-500/10 hover:border-green-400/40 transition">
            <span className="rounded-full w-8 h-8 flex items-center justify-center bg-green-800/20 shadow-inner ring-2 ring-green-400 mr-2">
              {getChainIcon("sol")}
            </span>
            <span className="font-medium uppercase text-white text-sm">Solana</span>
            <span className="text-green-200 text-xs font-mono ml-2">{truncateMiddle(sessionWallet, 6)}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: "0 0 28px #00FF9D99" }}
      transition={{ type: "spring", stiffness: 50 }}
      className="relative bg-[#1A1A1A] backdrop-blur-sm rounded-xl p-6 overflow-hidden focus-within:ring-2 focus-within:ring-green-400 outline-none group"
      tabIndex={0}
      aria-label="Wallet manager"
    >
      <div className="absolute inset-0 bg-green-500/10 blur-2xl -z-10" aria-hidden />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-green-500/10 w-7 h-7 flex items-center justify-center shadow-green-glow">
            <Plus className="w-5 h-5 text-green-400 drop-shadow-[0_0_7px_#00FF9D]" strokeWidth={2.3} />
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">My Wallets</h3>
        </div>
        <Button
          onClick={onAddWallet}
          className="rounded-full border-2 border-green-400 bg-green-600/20 text-green-200 shadow-green-glow px-5 py-2 hover:bg-green-400 hover:text-black transition-all focus-visible:ring-2 focus-visible:ring-green-400 font-semibold text-base inline-flex items-center gap-2"
          tabIndex={0}
          aria-label="Add wallet"
        >
          <Plus className="w-4 h-4" />
          Add Wallet
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
