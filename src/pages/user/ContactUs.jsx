import React from "react";
import Navbar from "../../components/layouts/user/Navbar";
import Banner1 from '../../assets/Banner1.png'
import Footer from "../../components/layouts/user/Footer";
const ContactUs=()=>{
    return (
        <div className="min-h-screen bg-gray-100">
      {/* Header with Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center pt-28">
        {/* Image with centered text */}
        <div className="relative w-full md:h-96 overflow-hidden">
          <img
            src={Banner1}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white">
            Contact Us
          </h1>
        </div>
        <div>
            <Footer />
        </div>
      </main>
    </div>
    )
}

export default ContactUs