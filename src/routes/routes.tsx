import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const IndexPage = lazy(() => import('../pages/Index'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const AcademyPage = lazy(() => import('../pages/AcademyPage'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<IndexPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/academy" element={<AcademyPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
