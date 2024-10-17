import React from 'react';
import { FaUser, FaHistory } from 'react-icons/fa'; // Importing icons

export default function ProfileMenu({ setSelectedSection, selectedSection }) {
  return (
    <div className="w-full bg-white min-h-64 shadow-2xl h-full p-6 flex flex-col justify-between rounded-lg mt-8 mx-auto max-w-md">
      <div>
        <h2 className="text-3xl text-center font-extrabold text-gray-900 mb-10 tracking-wide">Profile Menu</h2>
        
        <ul className="space-y-8">
          {/* Profile Section */}
          <li
            className={`flex items-center space-x-4 cursor-pointer p-4 rounded-xl transition-all duration-300 ${
              selectedSection === 'profile'
                ? 'bg-gradient-to-r from-blue-700 to-indigo-500 text-white shadow-lg transform scale-105'
                : 'text-gray-800 hover:bg-gray-100 hover:shadow-md'
            }`}
            onClick={() => setSelectedSection('profile')}
          >
            <FaUser className="text-xl transition-transform duration-300" />
            <span className="font-bold text-lg">Profile Details</span>
          </li>

          {/* Booking History Section */}
          <li
            className={`flex items-center space-x-4 cursor-pointer p-4 rounded-xl transition-all duration-300 ${
              selectedSection === 'bookings'
                ? 'bg-gradient-to-r from-blue-700 to-indigo-500 text-white shadow-lg transform scale-105'
                : 'text-gray-800 hover:bg-gray-100 hover:shadow-md'
            }`}
            onClick={() => setSelectedSection('bookings')}
          >
            <FaHistory className="text-xl transition-transform duration-300" />
            <span className="font-bold text-lg">Booking History</span>
          </li>

          {/* Additional sections can go here */}
        </ul>
      </div>
    </div>
  );
}
