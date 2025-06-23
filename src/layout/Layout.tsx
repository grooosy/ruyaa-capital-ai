import React, { ReactNode } from 'react';
import Navbar from '../components/navbar/Navbar';
import BackgroundCanvas from '../components/BackgroundCanvas'; // Import BackgroundCanvas

// Shared Layout with navigation
const Layout: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <BackgroundCanvas /> {/* Use BackgroundCanvas */}
      {/* Navbar should have its own z-index if it needs to be above BackgroundCanvas's internal elements,
          but BackgroundCanvas itself is z-index: -1, so direct children of this div will be on top.
          The Navbar styling (bg-gray-900) will make it appear on top of the canvas.
      */}
      <Navbar />
      {/* Ensure main content is visually distinct from the potentially busy background.
          Adding a semi-transparent dark background to main content containers might be needed
          if text readability is an issue over the BackgroundCanvas.
          For now, assuming text colors provide enough contrast.
      */}
      <main className="mx-auto px-4 my-4 relative z-10"> {/* z-10 to be explicitly above BackgroundCanvas if any doubt */}
        {children}
      </main>
      {/* Consider adding Footer here if it's meant to be on all pages */}
    </div>
  );
};

export default Layout;
