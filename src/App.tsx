import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import Index from "./pages/Index";
import AgentsPage from "./pages/AgentsPage";
import MT4Page from "./pages/MT4Page";
import CryptoPage from "./pages/CryptoPage";
import ArbitragePage from "./pages/ArbitragePage";
import AcademyPage from "./pages/AcademyPage";
import DepositPage from "./pages/DepositPage";
import WithdrawPage from "./pages/WithdrawPage";
import ProfilePage from "./pages/ProfilePage";
import MarketPage from "./pages/MarketPage";
import NotFound from "./pages/NotFound";
import WelcomePage from "./pages/WelcomePage";
import HowItWorksPage from "./pages/HowItWorksPage";

import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import ParticleBackground from "@/components/ParticleBackground";
import NeuralNetworkOverlay from "@/components/NeuralNetworkOverlay";
import routes from "tempo-routes";
import AppProviders from "./app/AppProviders";

import "@solana/wallet-adapter-react-ui/styles.css";

const AppRoutes = () => {
  const tempoRoutes = import.meta.env.VITE_TEMPO ? useRoutes(routes) : null;

  if (tempoRoutes) {
    return tempoRoutes;
  }

  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/agents" element={<AgentsPage />} />
      <Route path="/agents/mt4mt5" element={<MT4Page />} />
      <Route path="/agents/crypto" element={<CryptoPage />} />
      <Route path="/agents/arbitrage" element={<ArbitragePage />} />
      <Route path="/academy" element={<AcademyPage />} />
      <Route path="/deposit" element={<DepositPage />} />
      <Route path="/withdraw" element={<WithdrawPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/market" element={<MarketPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <AppProviders>
      <Toaster />
      <Sonner />
      <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-gray-950 to-black font-spacegrotesk overflow-x-hidden z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-green/5 via-transparent to-transparent" />
        <ParticleBackground />
        <NeuralNetworkOverlay />
        <div className="relative z-10">
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </div>
    </AppProviders>

  );
};

export default App;
