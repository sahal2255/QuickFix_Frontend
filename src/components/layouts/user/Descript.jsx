import React from 'react';
import CarImg from '../../../assets/car4k2.jpg';

const Descript = () => {
  return (
    <div className="py-12 px-6 bg-gray-100"> {/* Container with padding and background color */}
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">About Our Services</h2>
      <div className="flex flex-col md:flex-row items-start md:justify-between max-w-6xl mx-auto">
        {/* Left Section: Image */}
        <div className="md:w-1/2 w-full bg-gray-500 rounded-lg overflow-hidden mb-6 md:mb-0 shadow-md">
          <img src={CarImg} alt="About our services" className="w-full h-full object-cover" />
        </div>

        {/* Right Section: Description */}
        <div className="md:w-1/2 w-full bg-gray-100 p-10 rounded-lg m-10 ">
          <h3 className="text-2xl font-medium mb-4 text-gray-800">Why Choose Quick Fix?</h3>
          <ol className="list-decimal pl-5 text-gray-700 space-y-3">
            <li className="leading-relaxed">
              <strong>Expert Technicians:</strong> At Quick Fix, our skilled technicians use the latest tools and technology to diagnose and repair your vehicle, ensuring top-quality care every time.
            </li>
            <li className="leading-relaxed">
              <strong>Convenient & Reliable Service:</strong> We offer fast, efficient service to get you back on the road quickly, all while maintaining the highest standards of reliability and customer satisfaction.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Descript;
