import react from 'react';
import NavStyles from './Nav.modules.ts';
import NavLinks from './NavLinks.tsx';
import AuthMenu from './AuthMenu.tsx';
import NotificationDropdown from './NotificationDropdown.tsx';

// Basic Navbar layout
function Navbar() {
  return (
    <div className="flex justify-between center items-center w-v-px">
      <NavLinks />
      <AuthMenu />
      <NotificationDropdown />
    </div>
  );
}

export default Navbar;