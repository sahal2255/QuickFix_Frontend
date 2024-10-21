import React from "react";
import { CiInstagram } from "react-icons/ci";
import { FiTwitter } from "react-icons/fi";
import { TiSocialFacebookCircular } from "react-icons/ti";
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between px-6">
        {/* Left Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gray-300">Services</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Middle Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">123 Street, City, Country</p>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>

        {/* Right Section with Social Media */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex justify-center md:justify-start space-x-4 text-2xl">
            <a href="#" className="hover:text-gray-300"><CiInstagram /></a>
            <a href="#" className="hover:text-gray-300"><FiTwitter /></a>
            <a href="#" className="hover:text-gray-300"><TiSocialFacebookCircular /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
