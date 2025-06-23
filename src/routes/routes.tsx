import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const WelcomePage = lazy(() => import('../pages/Welcome'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const AcademyPage = lazy(() => import('../pages/AcademyPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => (\n  <Routes loader={() => require('react-router-dom')}>\n    <Route path="/" element={ <WelcomePage /> } />\n    <Route path="/dashboard" element={ <DashboardPage /> } />\n    <Route path="/academy" element={ <AcademyPage > } />\n    <Route path="*" element={ <NotFoundPage /> } />\n  </Routes>\n);

export default AppRoutes;