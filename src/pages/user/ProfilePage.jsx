import React, { useState } from 'react';
import Sidebar from '../../components/layouts/user/ProfileMenu';
import ProfileDetails from '../../components/layouts/user/Profile';
import BookingHistory from '../../components/layouts/user/BookingHistory';
import Navbar from '../../components/layouts/user/Navbar'; // Assuming Navbar is correctly placed in components/layouts/user/
import Footer from '../../components/layouts/user/Footer'
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
      {/* Navbar fixed at the top */}
      <header className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>

      <div className="flex flex-grow mt-24 pt-6 justify-center mb-5"> 
        <div className="flex w-full max-w-7xl space-x-6"> {/* Adjust container width and spacing */}
          
          {/* Sidebar (Left) */}
          <div className="w-1/4 bg-white shadow-lg rounded-lg sticky top-24 h-fit self-start">
            <Sidebar setSelectedSection={setSelectedSection} selectedSection={selectedSection} />
          </div>

          {/* Render Content (Right) */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-8 flex justify-center ">
            <div className="w-full max-h-[75vh] overflow-y-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
          <Footer />
        </div>
    </div>
  );
}
