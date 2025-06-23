import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy imports for pages
const WelcomePage = lazy(() => import('../pages/Welcome'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const AcademyPage = lazy(() => import('../pages/AcademyPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

// Centralized routes as a function
const AppRoutes: React.FC = () => (
  <Routes loader={() => require('react-router-dom')}>
    <Route path="/" element=
      <Suspense fallback={() => <div>Loading...</div>)}
      ><WelcomePage /></Suspense>
    />
    <Route path="/dashboard" element=
      <Suspense fallback={() => <div>Loading...</div>)}
      ><DashboardPage /></Suspense>
    />
    <Route path="/academy" element=
      <Suspense fallback={() => <div>Loading...</div>)}
      ><AcademyPage /></Suspense>
    />
    <Route path="*" element=
      <Suspense fallback={() => <div>Loading...</div>)}
      ><NotFoundPage ></NotFoundPage></Suspense>
  </Routes>
);
export default AppRoutes;