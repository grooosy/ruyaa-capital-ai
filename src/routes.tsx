import { lazy } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import routes from 'tempo-routes';

const Index = lazy(() => import('./pages/Index'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AgentsPage = lazy(() => import('./pages/AgentsPage'));
const MT4Page = lazy(() => import('./pages/MT4Page'));
const CryptoPage = lazy(() => import('./pages/CryptoPage'));
const ArbitragePage = lazy(() => import('./pages/ArbitragePage'));
const AcademyPage = lazy(() => import('./pages/AcademyPage'));
const DepositPage = lazy(() => import('./pages/DepositPage'));
const WithdrawPage = lazy(() => import('./pages/WithdrawPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const MarketPage = lazy(() => import('./pages/MarketPage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const BrokerRegistrationPage = lazy(() => import('./pages/BrokerRegistrationPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const AppRoutes = () => {
  const tempoRoutes = useRoutes(routes);
  if (import.meta.env.VITE_TEMPO) {
    return tempoRoutes;
  }
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/agents" element={<AgentsPage />} />
      <Route path="/agents/mt4mt5" element={<MT4Page />} />
      <Route path="/agents/crypto" element={<CryptoPage />} />
      <Route path="/agents/arbitrage" element={<ArbitragePage />} />
      <Route path="/academy" element={<AcademyPage />} />
      <Route path="/deposit" element={<DepositPage />} />
      <Route path="/withdraw" element={<WithdrawPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/market" element={<MarketPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/register/broker" element={<BrokerRegistrationPage />} />
      {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
