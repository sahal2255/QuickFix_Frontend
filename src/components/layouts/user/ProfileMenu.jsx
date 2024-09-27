import React from 'react'

export default function ProfileMenu({ setSelectedSection, selectedSection }) {
  return (
    <div className="w-64 bg-white shadow-md h-screen p-5">
      <h2 className="text-xl font-bold text-gray-800 mb-8">Dashboard</h2>
      <ul className="space-y-6">
        <li
          className={`cursor-pointer p-3 rounded-lg ${
            selectedSection === 'profile' ? 'bg-blue-500 text-white' : 'text-gray-700'
          }`}
          onClick={() => setSelectedSection('profile')}
        >
          Profile Details
        </li>
        <li
          className={`cursor-pointer p-3 rounded-lg ${
            selectedSection === 'bookings' ? 'bg-blue-500 text-white' : 'text-gray-700'
          }`}
          onClick={() => setSelectedSection('bookings')}
        >
          Booking History
        </li>
        {/* Add more sections as needed */}
      </ul>
    </div>
  )
}
