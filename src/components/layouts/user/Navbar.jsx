import React, { useState } from 'react';
import { FaBars, FaUser, FaTimes } from 'react-icons/fa';
import Logo from '../../../assets/QuickFixlog.png'
import { UserLogout } from '../../../services/user/UserSignService';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onLogout = async () => {
    try {
        const response = await UserLogout();
        console.log('Logout successful:', response);
        
    } catch (error) {
        console.error('Logout error:', error);
    }
};

  return (
    <nav className="bg-gradient-to-r bg-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src={Logo} 
            alt="Logo" 
            className="h-12 w-12 mr-3"
          />
          <FaBars onClick={toggleMenu} className="cursor-pointer md:hidden text-black" />
        </div>

        <div className="hidden md:flex space-x-8 text-lg font-semibold">
          <a href="#home" className="text-black hover:text-indigo-200 transition-colors duration-300">
            Home
          </a>
          <a href="#about" className="text-black hover:text-indigo-200 transition-colors duration-300">
            About
          </a>
          <a href="/service" className="text-black hover:text-indigo-200 transition-colors duration-300">
            Services
          </a>
          <a href="#contact" className="text-black hover:text-indigo-200 transition-colors duration-300">
            Contact
          </a>
          <button className='bg-red-500'
          onClick={onLogout}
          >
            logout
          </button>
        </div>

        <div className="text-2xl text-black">
          <FaUser className="hover:text-indigo-200 cursor-pointer transition-colors duration-300" />
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden rounded-r-lg`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <FaTimes onClick={toggleMenu} className="text-gray-800 cursor-pointer" />
        </div>
        <div className="p-4 space-y-4">
          <a href="#home" className="block py-2 px-4 text-gray-800 font-medium hover:bg-gray-100 rounded-md transition-colors duration-300">
            Home
          </a>
          <a href="#about" className="block py-2 px-4 text-gray-800 font-medium hover:bg-gray-100 rounded-md transition-colors duration-300">
            About
          </a>
          <a href="/service" className="block py-2 px-4 text-gray-800 font-medium hover:bg-gray-100 rounded-md transition-colors duration-300">
            Services
          </a>
          <a href="#contact" className="block py-2 px-4 text-gray-800 font-medium hover:bg-gray-100 rounded-md transition-colors duration-300">
            Contact
          </a>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}