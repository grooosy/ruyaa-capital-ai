import React from 'react';
import WelcomePage from "./pages/Welcome";
import { Routes, Router } from 'react-router-dom';

const App = () => {
  return (\n    <Router>\n      <Routes as="appRoutes">\n        <route path="/welcome" element={ <WelcomePage /> } />\n      </Routes>\n    </Router>\n  );
};

export default App;
