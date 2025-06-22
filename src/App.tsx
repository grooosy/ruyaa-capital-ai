import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChatProvider } from '@/context/ChatContext';
import { WalletProvider } from '@/context/WalletProvider';
import { Toaster } from '@/components/ui/sonner';
import LiveMarketTicker from '@/components/LiveMarketTicker';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/chat/ChatWidget';
import ParticleBackground from '@/components/ParticleBackground';
import FuturisticBackground from '@/components/FuturisticBackground';

// Pages
import WelcomePage from './pages/Welcome';
import Index from './pages/Index';
import AgentsPage from './pages/AgentsPage';
import MT4Page from './pages/MT4Page';
import CryptoPage from './pages/CryptoPage';
import ArbitragePage from './pages/ArbitragePage';
import AcademyPage from './pages/AcademyPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import HowItWorksPage from './pages/HowItWorksPage';
import MarketPage from './pages/MarketPage';
import BrokerRegistrationPage from './pages/BrokerRegistrationPage';
import AuthCard from './components/AuthCard';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <ChatProvider>
          <TooltipProvider>
            <BrowserRouter>
              <div className="relative min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white overflow-x-hidden">
                {/* Global Background Elements */}
                <FuturisticBackground />
                <ParticleBackground />
                
                {/* Live Market Ticker */}
                <LiveMarketTicker />
                
                {/* Main Navigation */}
                <Navbar />
                
                {/* Main Content */}
                <main className="relative z-10">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/agents" element={<AgentsPage />} />
                    <Route path="/agents/mt4mt5" element={<MT4Page />} />
                    <Route path="/agents/crypto" element={<CryptoPage />} />
                    <Route path="/agents/arbitrage" element={<ArbitragePage />} />
                    <Route path="/academy" element={<AcademyPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/deposit" element={<DepositPage />} />
                    <Route path="/withdraw" element={<WithdrawPage />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/market" element={<MarketPage />} />
                    <Route path="/register/broker" element={<BrokerRegistrationPage />} />
                    <Route path="/auth" element={<AuthCard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                
                {/* Chat Widget */}
                <ChatWidget />
                
                {/* Global Toast Notifications */}
                <Toaster />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </ChatProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
};

export default App;