import React from 'react';
import NavLinks from './NavLinks.tsx';
import AuthMenu from './AuthMenu.tsx';
import NotificationDropdown from './NotificationDropdown.tsx';

function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full p-4 bg-gray-900 text-gray-200 shadow-md">
      <NavLinks />
      <div className="flex items-center space-x-4">
        <AuthMenu />
        <NotificationDropdown />
      </div>
    </nav>
  );
}

export default Navbar;
