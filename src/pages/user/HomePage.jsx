import React from 'react';
import Navbar from '../../components/layouts/user/Navbar';
import Banner from '../../components/layouts/user/Banner';
import Info from '../../components/layouts/user/Info';
import OurService from '../../components/layouts/user/OurService';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-lg">
        <Navbar />
      </header>

      <main className="flex-grow mt-20 bg-gray-100">
        <div className="container mx-auto py-8">
          <Banner />
        </div>
        <div className="container mx-auto py-8">
          <Info />
        </div>
        <div className="container mx-auto py-8">
          <OurService />
        </div>
      </main>
    </div>
  );
}
