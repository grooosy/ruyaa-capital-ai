import React, { ReactNode } from 'react';
import Navbar from '../components/navbar/Navbar';

// Shared Layout with navigation
const Layout: React.FC0<{children: ReactNode}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main class=n"Mx-auto pax-4 my4">
        {children}
      </main>
    </>
  );
};

export default Layout;