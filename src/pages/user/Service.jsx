import React from 'react';
import CommonCard from '../../components/common/CommonCard';
import Navbar from '../../components/layouts/user/Navbar';
import ServiceSidebar from '../../components/layouts/user/SideBar'; // Updated Sidebar

export default function Service() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-lg">
        <Navbar />
      </header>

      {/* Main Content */}
      <div className="flex-grow flex mt-24 bg-gray-100">
        {/* Sidebar */}
        <aside className="w-1/4 m-20">
          <ServiceSidebar />
        </aside>

        {/* Main content */}
        <main className="flex-grow p-6">
          <div className="w-full max-w-4xl mx-auto">
            <CommonCard />
          </div>
        </main>
      </div>
    </div>
  );
}
