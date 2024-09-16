import React, { useEffect, useState } from 'react';
import { UserProfile } from '../../../services/user/UserSignService';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // For navigation after logout

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

  // Logout function
  const handleLogout = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear the token


    navigate('/login');
  };

  if (!userData) {
    return (
      <div className="max-w-lg mx-auto mt-12 bg-white p-10 rounded-2xl shadow-2xl border border-gray-300">
        <p className="text-center text-gray-700">Loading profile details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-10 rounded-2xl shadow-2xl border border-gray-300 overflow-hidden">
      {/* Profile Header */}
      <div className="relative flex flex-col items-center mb-8">
        {/* Avatar */}
        <img
          src={userData.avatar || "https://via.placeholder.com/120"}
          alt="Profile Avatar"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-xl"
        />
        
        <h2 className="text-5xl font-extrabold text-gray-800 mt-6 mb-2">{userData.userName || 'No Name'}</h2>
        <p className="text-gray-600 text-xl">{userData.email || 'No Email'}</p>
      </div>

      {/* Profile Details */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
          <p className="text-gray-700 font-semibold text-xl">Username:</p>
          <p className="font-medium text-gray-900 text-xl">{userData.userName || 'N/A'}</p>
        </div>
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
          <p className="text-gray-700 font-semibold text-xl">Email:</p>
          <p className="font-medium text-gray-900 text-xl">{userData.email || 'N/A'}</p>
        </div>
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
          <p className="text-gray-700 font-semibold text-xl">Phone Number:</p>
          <p className="font-medium text-gray-900 text-xl">{userData.phoneNumber || 'N/A'}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex justify-between">
        {/* Edit Profile Button */}
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-bold transition-transform duration-300 shadow-lg transform hover:scale-105">
          Edit Profile
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-6 rounded-lg font-bold transition-transform duration-300 shadow-lg transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
