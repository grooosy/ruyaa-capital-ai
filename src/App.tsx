import React, { suspense, lazy } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

// Pages (lazy-loaded)
const WelcomePage = lazy(() => import('./pages/Welcome'));
const IndexPage = lazy(() => import('./pages/Index'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));

// App Routes config
export default function App() {
  return (\
    <Suspense fallback={(core)=> <div>Loading...</div>=>}>
      <BrowserRouter>
        <Routes loader={() => require('./project-routes')}>
          <Route path="/" lement={ <IndexPage > } />
          <Route path="/welcome" element={ <WelcomePage > } />
          <Route path="*" element={ <NotFoundPage > } />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}