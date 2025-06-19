"use client"

import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import AgentsPage from "./pages/AgentsPage"
import MT4Page from "./pages/MT4Page"
import CryptoPage from "./pages/CryptoPage"
import ArbitragePage from "./pages/ArbitragePage"
import AcademyPage from "./pages/AcademyPage"
import DepositPage from "./pages/DepositPage"
import WithdrawPage from "./pages/WithdrawPage"
import NotFound from "./pages/NotFound"
import WelcomePage from "./pages/WelcomePage"
import HowItWorksPage from "./pages/HowItWorksPage"
import { ChatProvider } from "./context/ChatContext"
import AuthPage from "./pages/AuthPage"
import DashboardPage from "./pages/DashboardPage"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import { WalletProvider } from "./context/WalletProvider"
import ParticleBackground from "@/components/ParticleBackground"
import NeuralNetworkOverlay from "@/components/NeuralNetworkOverlay"
import { useRoutes } from "react-router-dom"

import "@solana/wallet-adapter-react-ui/styles.css"

const queryClient = new QueryClient()

const AppRoutes = () => {
  // Tempo routes - must be called inside Router context

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
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ChatProvider>
          <WalletProvider>
            <Toaster />
            <Sonner />
            {/* Modern Futuristic Background */}
            <div className="relative min-h-screen w-full bg-black font-spacegrotesk overflow-x-hidden">
              {/* Subtle geometric grid overlay */}
              <div className="absolute inset-0 bg-futuristic-grid opacity-[0.015]" />

              {/* Animated gradient orbs */}
              <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-gold/30 to-white/10 rounded-full blur-3xl animate-float-slow" />
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-white/5 to-gold/20 rounded-full blur-3xl animate-float-reverse" />

              {/* Subtle particle system */}
              <ParticleBackground />

              {/* Enhanced neural network overlay */}
              <NeuralNetworkOverlay />

              {/* Content layer */}
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
  )
}

export default App
