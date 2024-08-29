import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Admin profile icon
import { AiFillHome } from 'react-icons/ai'; // Company icon

export default function TopBar() {
  return (
    <nav className="bg-blue-600 p-4 flex items-center justify-between fixed top-0 left-0 right-0">
      <div className="flex items-center">
        <AiFillHome className="text-white text-3xl" />
        <span className="text-white text-xl ml-2 font-semibold">Company Name</span>
      </div>
      <div className="flex items-center">
        <FaUserCircle className="text-white text-3xl" />
        <span className="text-white text-lg ml-2 hidden md:inline-block">Admin</span>
      </div>
    </nav>
  );
}
