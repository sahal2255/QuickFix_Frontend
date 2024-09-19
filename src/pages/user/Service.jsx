import React from 'react';
import CommonCard from '../../components/common/CommonCard';
import Navbar from '../../components/layouts/user/Navbar';

export default function Service() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-lg">
        <Navbar />
      </header>
      
      <div className="flex-grow flex items-center justify-center mt-24 bg-gray-100">
        <div className="w-full max-w-4xl mx-auto p-6">
          <CommonCard />
        </div>
      </div>

    </div>
  );
}
