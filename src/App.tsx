import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChatProvider } from '@/context/ChatContext';
import { WalletProvider } from '@/context/WalletProvider';
import { useTheme } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/sonner';
import { Toaster as Sonner } from "@/components/ui/toaster";

// Components
import LiveMarketTicker from '@/components/LiveMarketTicker';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/chat/ChatWidget';
import ThemeToggle from '@/components/ThemeToggle';
import ParticleBackground from "@/components/ParticleBackground";
import NeuralNetworkOverlay from "@/components/NeuralNetworkOverlay";
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

// Tempo routes
import routes from "tempo-routes";

// Styles
import "@solana/wallet-adapter-react-ui/styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Theme wrapper to apply theme classes to the app
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Apply theme class to body for global styles
    document.body.className = theme === 'dark' ? 'bg-background-dark' : 'bg-background-light';
  }, [theme]);
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-background-dark text-text-primary-dark' 
        : 'bg-background-light text-text-primary-light'
    }`}>
      {children}
    </div>
  );
};

// App Routes Component
const AppRoutes = () => {
  // Use useRoutes at the top level of the component
  const tempoRoutes = useRoutes(
    import.meta.env.VITE_TEMPO 
      ? [
          ...routes,
          { path: "*", element: <NotFound /> }
        ]
      : [
          { path: "/", element: <Index /> },
          { path: "/welcome", element: <WelcomePage /> },
          { path: "/auth", element: <AuthCard /> }, // Using AuthCard instead of AuthPage
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/agents", element: <AgentsPage /> },
          { path: "/agents/mt4mt5", element: <MT4Page /> },
          { path: "/agents/crypto", element: <CryptoPage /> },
          { path: "/agents/arbitrage", element: <ArbitragePage /> },
          { path: "/academy", element: <AcademyPage /> },
          { path: "/deposit", element: <DepositPage /> },
          { path: "/withdraw", element: <WithdrawPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/market", element: <MarketPage /> },
          { path: "/how-it-works", element: <HowItWorksPage /> },
          { path: "/register/broker", element: <BrokerRegistrationPage /> },
          { path: "*", element: <NotFound /> }
        ]
  );

  return tempoRoutes;
};

// Main App Component
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <ChatProvider>
          <TooltipProvider>
            <Toaster position="top-center" richColors />
            <Sonner />
            
            <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-gray-950 to-black font-spacegrotesk overflow-x-hidden z-0">
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-green/5 via-transparent to-transparent" />
              
              <ParticleBackground />
              <NeuralNetworkOverlay />
              
              <BrowserRouter>
                <ThemeWrapper>
                  {/* Theme Toggle Button */}
                  <div className="fixed bottom-6 right-6 z-50">
                    <ThemeToggle />
                  </div>
                  
                  {/* Live Market Ticker */}
                  <LiveMarketTicker />
                  
                  {/* Main Navigation */}
                  <Navbar />
                  
                  {/* Main Content */}
                  <main className="relative z-10">
                    <AppRoutes />
                  </main>
                  
                  {/* Chat Widget */}
                  <ChatWidget />
                </ThemeWrapper>
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </ChatProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
};

export default App;