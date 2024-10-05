import React from 'react';
import { FaUser, FaHistory } from 'react-icons/fa'; // Importing icons

export default function ProfileMenu({ setSelectedSection, selectedSection }) {
  return (
    <div className="w-full bg-white shadow-md h-screen p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h2>
        
        {/* Menu Items */}
        <ul className="space-y-6">
          {/* Profile Section */}
          <li
            className={`flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition duration-300 ${
              selectedSection === 'profile'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'text-gray-700 hover:bg-gray-100 hover:shadow-md'
            }`}
            onClick={() => setSelectedSection('profile')}
          >
            <FaUser className="text-lg" />
            <span className="font-semibold text-md">Profile Details</span>
          </li>

          {/* Booking History Section */}
          <li
            className={`flex items-center space-x-4 cursor-pointer p-3 rounded-lg transition duration-300 ${
              selectedSection === 'bookings'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'text-gray-700 hover:bg-gray-100 hover:shadow-md'
            }`}
            onClick={() => setSelectedSection('bookings')}
          >
            <FaHistory className="text-lg" />
            <span className="font-semibold text-md">Booking History</span>
          </li>

          {/* Add more sections as needed */}
        </ul>
      </div>

      {/* Footer or Additional Links */}
      <div className="mt-auto">
        <hr className="my-6" />
        <p className="text-sm text-gray-500">© 2024 Dashboard</p>
      </div>
    </div>
  );
}
