import React, { useState } from 'react';
import Sidebar from '../../components/layouts/user/ProfileMenu';
import ProfileDetails from '../../components/layouts/user/Profile';
import BookingHistory from '../../components/layouts/user/BookingHistory';
import Navbar from '../../components/layouts/user/Navbar'; 
import Footer from '../../components/layouts/user/Footer';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for the toggle button

export default function ProfilePage() {
  const [selectedSection, setSelectedSection] = useState('profile'); // Default section
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar

  const renderContent = () => {
    switch (selectedSection) {
      case 'profile':
        return <ProfileDetails />;
      case 'bookings':
        return <BookingHistory />;
      default:
        return <ProfileDetails />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar fixed at the top */}
      <header className="fixed top-0 left-0 right-0 z-20">
        <Navbar />
      </header>

      {/* Main container */}
      <div className="flex flex-grow mt-24 pt-6 justify-center mb-5 relative">
        <div className="flex w-full max-w-7xl space-x-6">

          {/* Sidebar (Left) */}
          <div
            className={`md:w-1/4 bg-white shadow-lg rounded-lg transition-transform duration-300 z-10 md:fixed md:top-[5px] md:left-0 md:h-[calc(100vh-96px)] md:flex md:flex-col md:justify-start md:pt-6 ${
              isSidebarOpen ? 'absolute left-0 translate-x-0' : 'absolute -translate-x-full'
            } md:relative md:translate-x-0`} // Sidebar becomes fixed below the navbar on larger screens
          >
            <Sidebar
              setSelectedSection={setSelectedSection}
              selectedSection={selectedSection}
              setIsSidebarOpen={setIsSidebarOpen} // Close sidebar when a section is selected
            />
          </div>

          {/* Render Content (Right) */}
          <div
            className={`flex-1 bg-white shadow-md rounded-lg p-8 flex justify-center transition-all duration-300 ${
              isSidebarOpen ? 'md:w-auto' : 'w-full'
            } md:ml-[25%]`} // Content pushes to the right when the sidebar is open on larger screens
          >
            <div className="w-full max-h-[75vh] overflow-y-auto">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Toggle Sidebar Button */}
        <button
          className="md:hidden absolute top-10 right-5 z-30 text-white bg-blue-500 p-3 rounded-full"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
