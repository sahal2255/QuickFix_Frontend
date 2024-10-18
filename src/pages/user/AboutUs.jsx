import React from 'react'
import Navbar from '../../components/layouts/user/Navbar'
import Banner1 from '../../assets/Banner1.png'
import AsideImage from '../../assets/EngineSer.png'
import Info from '../../components/layouts/user/Info'

const AboutUs = () => {
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
            About Us
          </h1>
        </div>

        <div className="mt-10">
          <Info />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-16 px-4 w-full max-w-screen-lg mx-auto py-12 ">
            <div className="mx-auto mb-6 sm:mb-0 sm:mr-8">
                <img
                src={AsideImage}
                alt="Service Image"
                className="w-full sm:w-80 h-80 object-cover mx-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="w-full sm:w-1/2 text-center sm:text-left p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Exceptional Services</h2>
                <p className="text-lg text-gray-700 mb-6">
                We provide top-notch services to ensure the best user experience. Our team is dedicated to delivering quality solutions that cater to the needs of our clients.
                </p>
                <p className="text-lg text-gray-700">
                From customer support to technical services, we focus on making every step of your journey with us seamless and efficient.
                </p>
            </div>
            </div>




       
      </main>
    </div>
  )
}

export default AboutUs
