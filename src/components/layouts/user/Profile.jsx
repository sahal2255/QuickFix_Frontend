import React, { useEffect, useState } from 'react';
import { UserProfile, UserLogout } from '../../../services/user/UserSignService';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom'; // For navigation

export default function ProfileDetails() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await UserProfile();
        setUserData(data);
      } catch (error) {
        console.log('Profile details error', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await UserLogout();
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleEditProfile = () => {
    console.log('edit button clicked');
    
  };

  if (!userData) {
    return <div className="text-center text-gray-600">Loading profile details...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl font-bold">
          {userData.userName ? userData.userName.charAt(0).toUpperCase() : 'U'}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">{userData.userName || 'N/A'}</h2>
        <p className="text-gray-500">{userData.email || 'N/A'}</p>
      </div>

      {/* Profile Details */}
      <div className="space-y-6">
        {/* Username */}
        <div className="flex items-center space-x-4">
          <FaUser className="text-blue-500 text-xl" />
          <div className="flex-1">
            <p className="text-gray-500">Username:</p>
            <p className="font-semibold text-gray-900">{userData.userName || 'N/A'}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-blue-500 text-xl" />
          <div className="flex-1">
            <p className="text-gray-500">Email:</p>
            <p className="font-semibold text-gray-900">{userData.email || 'N/A'}</p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-center space-x-4">
          <FaPhone className="text-blue-500 text-xl" />
          <div className="flex-1">
            <p className="text-gray-500">Phone Number:</p>
            <p className="font-semibold text-gray-900">{userData.phoneNumber || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mt-8 flex justify-between">
        {/* Edit Profile Button */}
        <button
          onClick={handleEditProfile}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded-lg font-bold transition-transform duration-300 shadow-lg transform hover:scale-105"
        >
          Edit Profile
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-lg font-bold transition-transform duration-300 shadow-lg transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
