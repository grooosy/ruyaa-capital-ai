
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AgentsPage from "./pages/AgentsPage";
import MT4Page from "./pages/MT4Page";
import CryptoPage from "./pages/CryptoPage";
import ArbitragePage from "./pages/ArbitragePage";
import AcademyPage from "./pages/AcademyPage";
import NotFound from "./pages/NotFound";
import { ChatProvider } from "./context/ChatContext";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { WalletProvider } from "./context/WalletProvider";
import ParticleBackground from "@/components/ParticleBackground";
import NeuralNetworkOverlay from "@/components/NeuralNetworkOverlay";
import WhoAreWeCorner from "@/components/WhoAreWeCorner";
import GlobalMicroInteractions from "@/components/GlobalMicroInteractions";

import '@solana/wallet-adapter-react-ui/styles.css';

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
            <GlobalMicroInteractions />
            <Toaster />
            <Sonner />
            {/* Global dashboard background */}
            <div className="relative min-h-screen w-full bg-[#0A0A0A] font-spacegrotesk overflow-x-hidden z-0">
              <ParticleBackground />
              <NeuralNetworkOverlay />
              <WhoAreWeCorner />
              {/* Content sits above the backgrounds */}
              <div className="relative z-10">
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/agents" element={<AgentsPage />} />
                    <Route path="/agents/mt4mt5" element={<MT4Page />} />
                    <Route path="/agents/crypto" element={<CryptoPage />} />
                    <Route path="/agents/arbitrage" element={<ArbitragePage />} />
                    <Route path="/academy" element={<AcademyPage />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
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
