import React, { useState } from 'react';
import Sidebar from '../../components/layouts/user/ProfileMenu';
import ProfileDetails from '../../components/layouts/user/Profile';
import BookingHistory from '../../components/layouts/user/BookingHistory';
import Navbar from '../../components/layouts/user/Navbar'; // Assuming Navbar is correctly placed in components/layouts/user/
export default function ProfilePage() {
  const [selectedSection, setSelectedSection] = useState('profile'); // Default section

  const renderContent = () => {
    switch (selectedSection) {
      case 'profile':
        return <ProfileDetails />;
      case 'bookings':
        return <BookingHistory />;
      // Add more cases for other sections
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar at the top */}
      <header className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>

      {/* Sidebar and Main Content Section */}
      <div className="flex flex-grow justify-center mt-20"> {/* Adjusted to center content */}
        {/* Wrapper for the centered content */}
        <div className="flex w-full max-w-6xl">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-lg">
            <Sidebar setSelectedSection={setSelectedSection} selectedSection={selectedSection} />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-10 bg-white shadow-md rounded-lg ml-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
