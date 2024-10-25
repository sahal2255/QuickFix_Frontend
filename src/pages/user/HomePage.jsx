import React from 'react';
import Navbar from '../../components/layouts/user/Navbar';
import Banner from '../../components/layouts/user/Banner';
import Info from '../../components/layouts/user/Info';
import OurService from '../../components/layouts/user/OurService';
import Footer from '../../components/layouts/user/Footer'
import Descript from '../../components/layouts/user/Descript'
import { useSelector } from 'react-redux';
export default function HomePage() {
  const user = useSelector((state) => state.user);
  console.log('user in redux ',user)
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-lg">
        <Navbar />
      </header>

      <main className="flex-grow mt-20 bg-gray-100">
        <div className=" mx-auto py-8">
          <Banner />
        </div>
        <div className="container mx-auto py-8">
          <Info />
        </div>
        <div className="container mx-auto py-8">
          <OurService />
        </div>
        <div>
          <Descript />
        </div>
      </main>
      <div className="w-full">
          <Footer />
        </div>
    </div>
  );
}
