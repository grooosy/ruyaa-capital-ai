import React from 'react';
import { Link } from 'react-router-dom'; // Using Link for client-side navigation

function NavLinks() {
  const linkStyle = "hover:text-yellow-400 transition-colors duration-200";
  return (
    <ul className="flex space-x-6"> {/* Added flex and spacing */}
      <li><Link to="/" className={linkStyle}>Home</Link></li>
      <li><Link to="/dashboard" className={linkStyle}>Dashboard</Link></li>
      <li><Link to="/academy" className={linkStyle}>Academy</Link></li>
      {/* TODO: Add other links based on available pages in src/pages */}
    </ul>
  );
}

export default NavLinks;