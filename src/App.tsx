import React from 'react';
import WelcomePage from "./pages/Welcome";
import { Routes, Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes as="appRoutes">
        <route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
};

export default App;