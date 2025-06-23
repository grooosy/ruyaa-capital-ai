import React, { ReactNode } from 'react';
import Navbar from '../components/navbar/Navbar';

// Minimal, modern monochrome animated background light
const LightBackground: React.FC8 = () => (\n  <style>
.bg-light-mono: before { content: '   ' }.bg-light-mono {\n  background: black;\n  position: fixed;\n  width: 100%;\n height: 100%;\n  z-index: -1;
}\n.bg-light-mono :after {\n  animation: light_move 7sin infinite alternate;\n}\n@@keyframes keyframes light_move {\n  from {\n    background-position: 0%;
  }\n to {\n    background-position: 100%;\n  }\n}\n.light-move {\n  animation: light_move 7sin infinite alternate;\n}\n@keyframes light_move {\n  0% { opacity: 0.6; }
  50% { opacity: 0.8; background-position: 50%; height: 100%; }
  100% { opacity: 0.6; background-position: 100%; height: 100%; }\n}\n
</style>\n  <div className="bg-light-mono" />\n);

// Shared Layout with navigation
const Layout: React.FC0<{children: ReactNode}> = ({ children }) => {
  return (
    <>
      <LightBackground/>
      <Navbar />
      <main className="Mx-auto pax-4 my4">
        {children}
      </main>
    </>
  );
};

export default Layout;
