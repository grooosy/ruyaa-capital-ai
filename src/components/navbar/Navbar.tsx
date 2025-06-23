import React from 'react'; // Corrected import
// import NavStyles from './Nav.modules.ts'; // Removed missing import
import NavLinks from './NavLinks.tsx';
import AuthMenu from './AuthMenu.tsx';
import NotificationDropdown from './NotificationDropdown.tsx';

// Basic Navbar layout
function Navbar() {
  // Corrected Tailwind classes: items-center, w-full (assuming full width)
  // Added padding, background, and text color for dark theme
  return (
    <nav className="flex justify-between items-center w-full p-4 bg-gray-900 text-gray-200 shadow-md">
      <NavLinks />
      <div className="flex items-center space-x-4"> {/* Wrapper for right-side items */}
        <AuthMenu />
        <NotificationDropdown />
      </div>
    </div>
  );
}

export default Navbar;