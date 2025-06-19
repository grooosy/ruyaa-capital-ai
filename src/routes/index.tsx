import { lazy } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";

const Index = lazy(() => import("../pages/Index"));
const AgentsPage = lazy(() => import("../pages/AgentsPage"));
const MT4Page = lazy(() => import("../pages/MT4Page"));
const CryptoPage = lazy(() => import("../pages/CryptoPage"));
const ArbitragePage = lazy(() => import("../pages/ArbitragePage"));
const AcademyPage = lazy(() => import("../pages/AcademyPage"));
const DepositPage = lazy(() => import("../pages/DepositPage"));
const WithdrawPage = lazy(() => import("../pages/WithdrawPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const MarketPage = lazy(() => import("../pages/MarketPage"));
const NotFound = lazy(() => import("../pages/NotFound"));
const WelcomePage = lazy(() => import("../pages/WelcomePage"));
const HowItWorksPage = lazy(() => import("../pages/HowItWorksPage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));

export const AppRoutes = () => {
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

export default AppRoutes;
