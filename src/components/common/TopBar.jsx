import React from 'react';
import logo from '../../assets/QuickFixlog.png'; // Path to your logo

export default function TopBar({ toggleSidebar }) {
  return (
    <nav className="bg-black p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-30"> {/* Lower z-index for the TopBar */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Company Logo"
          className="w-12 h-12 object-contain" // Adjust size as needed
        />
        <span className="text-white text-xl font-semibold ml-2"></span>
      </div>
      <div className="flex items-center">
        <span className="text-white text-lg ml-2 hidden md:inline-block"></span>
      </div>
    </nav>
  );
}
