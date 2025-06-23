import React from 'react';
import { Bell } from 'lucide-react'; // Using an icon for notifications

function NotificationDropdown() {
  // Style similar to AuthMenu secondary button, but perhaps more subtle or icon-focused
  const buttonStyle = "p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 text-gray-300 hover:text-yellow-400";

  return (
    <div>
      {/* TODO: Implement actual dropdown functionality using Radix or Headless UI if needed */}
      <button className={buttonStyle} aria-label="Notifications">
        <Bell size={20} />
      </button>
    </div>
  );
}

export default NotificationDropdown;