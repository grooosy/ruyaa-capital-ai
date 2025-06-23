

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout'; // Assuming Layout component exists at this path

// Pages (lazy-loaded)
// const WelcomePage = lazy(() => import('./pages/Welcome')); // Commented out due to damaged file
const IndexPage = lazy(() => import('./pages/Index'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
// const DashboardPage = lazy(() => import('./pages/DashboardPage')); // Example: Uncomment if you have this page
// const AcademyPage = lazy(() => import('./pages/AcademyPage')); // Example: Uncomment if you have this page
// const AgentsPage = lazy(() => import('./pages/AgentsPage')); // Example: Uncomment if you have this page
// const ArbitragePage = lazy(() => import('./pages/ArbitragePage')); // Example: Uncomment if you have this page
// const MarketPage = lazy(() => import('./pages/MarketPage')); // Example: Uncomment if you have this page
// const ProfilePage = lazy(() => import('./pages/ProfilePage')); // Example: Uncomment if you have this page
// const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage')); // Example: Uncomment if you have this page
// const CryptoPage = lazy(() => import('./pages/CryptoPage')); // Example: Uncomment if you have this page
// const MT4Page = lazy(() => import('./pages/MT4Page')); // Example: Uncomment if you have this page
// const DepositPage = lazy(() => import('./pages/DepositPage')); // Example: Uncomment if you have this page
// const WithdrawPage = lazy(() => import('./pages/WithdrawPage')); // Example: Uncomment if you have this page
// const BrokerRegistrationPage = lazy(() => import('./pages/BrokerRegistrationPage')); // Example: Uncomment if you have this page


// App Routes config
export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            {/* <Route path="/welcome" element={<WelcomePage />} /> */} {/* Commented out due to damaged file */}
            {/* Add other routes here as needed, for example:
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/arbitrage" element={<ArbitragePage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/crypto" element={<CryptoPage />} />
            <Route path="/mt4" element={<MT4Page />} />
            <Route path="/deposit" element={<DepositPage />} />
            <Route path="/withdraw" element={<WithdrawPage />} />
            <Route path="/broker-registration" element={<BrokerRegistrationPage />} />
            */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
}
