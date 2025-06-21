import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
import { AppRoutes } from "./routes";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { WalletProvider } from "./context/WalletProvider";
import ParticleBackground from "@/components/ParticleBackground";
import NeuralNetworkOverlay from "@/components/NeuralNetworkOverlay";

import "@solana/wallet-adapter-react-ui/styles.css";

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ChatProvider>
          <WalletProvider>
            <Toaster />
            <Sonner />
            {/* Modern AI-styled background */}
            <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-gray-950 to-black font-spacegrotesk overflow-x-hidden z-0">
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-green/5 via-transparent to-transparent -z-10" />
              <ParticleBackground />
              <NeuralNetworkOverlay />
              {/* Content sits above the backgrounds */}
              <div className="relative z-10">
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </div>
            </div>
          </WalletProvider>
        </ChatProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;