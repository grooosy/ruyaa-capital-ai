
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useToast } from "@/hooks/use-toast";

// For display purposes only
function truncateMiddle(address: string, chars = 6) {
  if (!address) return "";
  const left = address.slice(0, chars);
  const right = address.slice(-chars);
  return `${left}...${right}`;
}

const WalletConnectButton: React.FC = () => {
  const { connected, publicKey, connect, disconnect, connecting } = useWallet();
  const { setVisible: setWalletModalVisible } = useWalletModal();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle wallet authentication with Supabase
  const handleWalletAuth = async () => {
    try {
      setIsLoading(true);

      if (!connected || !publicKey) {
        // Open wallet modal to connect
        setWalletModalVisible(true);
        return;
      }

      const walletAddress = publicKey.toBase58();

      // Check if user exists in profiles with this wallet - use any type to bypass TypeScript issues
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .maybeSingle() as { data: any, error: any };

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      if (existingProfile && existingProfile.email) {
        // User exists, sign them in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: existingProfile.email,
          password: walletAddress // Use wallet address as password for wallet users
        });

        if (signInError) {
          // If sign in fails, create the auth user
          await createWalletUser(walletAddress);
        } else {
          toast({
            title: "Welcome back!",
            description: `Connected with wallet ${truncateMiddle(walletAddress)}`,
          });
          navigate("/dashboard");
        }
      } else {
        // New user, create account
        await createWalletUser(walletAddress);
      }
    } catch (error: any) {
      console.error("Wallet auth error:", error);
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createWalletUser = async (walletAddress: string) => {
    try {
      const email = `${walletAddress}@wallet.local`;
      
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: walletAddress,
        options: {
          data: {
            full_name: `Wallet User ${truncateMiddle(walletAddress)}`,
            wallet_address: walletAddress,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // The handle_new_user trigger will create the profile automatically
        // Add wallet to wallets table
        const { error: walletError } = await supabase
          .from('wallets')
          .upsert({
            user_id: authData.user.id,
            address: walletAddress,
            chain: 'SOL',
          }, {
            onConflict: 'user_id,chain,address'
          });

        if (walletError) {
          console.error("Wallet storage error:", walletError);
        }

        toast({
          title: "Wallet connected!",
          description: `Successfully registered with wallet ${truncateMiddle(walletAddress)}`,
        });
        
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Create wallet user error:", error);
      throw error;
    }
  };

  // Effect to handle wallet connection changes
  useEffect(() => {
    if (connected && publicKey && !isLoading) {
      // Auto-authenticate when wallet connects
      handleWalletAuth();
    }
  }, [connected, publicKey]);

  const handleDisconnect = async () => {
    try {
      await disconnect();
      await supabase.auth.signOut();
      toast({
        title: "Disconnected",
        description: "Wallet disconnected successfully",
      });
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  if (connected && publicKey) {
    return (
      <div className="text-green-400 bg-green-400/10 rounded-lg p-3 mb-2 text-center">
        <p className="text-sm mb-2">Connected wallet:</p>
        <p className="font-mono text-green-300 break-all">{truncateMiddle(publicKey.toBase58(), 8)}</p>
        <Button 
          onClick={handleDisconnect} 
          variant="outline" 
          className="mt-3 border-green-400 text-green-400 hover:bg-green-400/10"
          size="sm"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      className="w-full py-3 rounded-full border-2 border-green-400 text-green-400 font-semibold text-lg hover:bg-green-400/10 hover:text-white transition flex items-center justify-center"
      onClick={handleWalletAuth}
      disabled={isLoading || connecting}
    >
      <Wallet className="w-5 h-5 mr-2" />
      {isLoading || connecting ? (
        <Loader2 className="animate-spin w-5 h-5" />
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
};

export default WalletConnectButton;
