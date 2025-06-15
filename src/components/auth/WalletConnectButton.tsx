
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

// For display purposes only (optional: can extract to utils)
function truncateMiddle(address: string, chars = 6) {
  if (!address) return "";
  const left = address.slice(0, chars);
  const right = address.slice(-chars);
  return `${left}...${right}`;
}

const WalletConnectButton: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const { setVisible: setWalletModalVisible } = useWalletModal();
  const [walletLoginLoading, setWalletLoginLoading] = useState(false);
  const navigate = useNavigate();

  const sessionWallet = (typeof window !== "undefined") ? sessionStorage.getItem("wallet_login") : null;

  async function handleWalletAuth() {
    setWalletLoginLoading(true);
    try {
      if (!connected) {
        setWalletModalVisible(true);
        setWalletLoginLoading(false);
        return;
      }
      if (publicKey) {
        const pubKeyStr = publicKey.toBase58();
        // Upsert row into wallets table for compatibility, but session is simulated.
        const { error } = await supabase.from("wallets").upsert(
          {
            user_id: pubKeyStr,
            address: pubKeyStr,
            chain: "SOL"
          },
          { onConflict: "user_id,chain,address" }
        );
        if (error) throw error;
        // Store session locally and redirect
        sessionStorage.setItem("wallet_login", pubKeyStr);
        navigate("/dashboard");
      }
    } catch (err: any) {
      // Optionally: show toast here
    }
    setWalletLoginLoading(false);
  }

  if (sessionWallet) {
    return (
      <div className="text-green-400 bg-green-400/10 rounded-lg p-3 mb-2 text-center break-all">
        Signed in as wallet: <span className="font-mono">{truncateMiddle(sessionWallet, 8)}</span>
        <Button onClick={() => { sessionStorage.removeItem("wallet_login"); window.location.reload(); }} variant="outline" className="ml-4">Sign out</Button>
      </div>
    );
  }
  return (
    <Button
      variant="outline"
      className="w-full py-3 rounded-full border-2 border-green-400 text-green-400 font-semibold text-lg hover:bg-green-400/10 hover:text-white transition flex items-center justify-center"
      onClick={handleWalletAuth}
      disabled={walletLoginLoading}
    >
      <Wallet className="w-5 h-5 mr-2" />
      {walletLoginLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Connect Wallet"}
    </Button>
  );
};

export default WalletConnectButton;
