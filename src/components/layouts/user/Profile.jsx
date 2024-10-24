import React, { useEffect, useState } from 'react';
import { UserProfile, UserLogout } from '../../../services/user/UserSignService';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CommonModal from '../../common/CommonModal'; 
import { useDispatch, useSelector } from 'react-redux';
import UserEditProfile from './UserEditProfile';
import { clearUser, setUser } from '../../../Redux/Slices/userSlice';

export default function ProfileDetails() {
  const [editModal, setEditModal] = useState(false); // Modal state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await UserProfile();
        if (data) {
          dispatch(setUser(data)); // Dispatch the setUser action to store data
        } else {
          dispatch(clearUser()); // Clear the user if no data is returned
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        dispatch(clearUser()); // Clear user if error occurs
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await UserLogout();
      dispatch(clearUser()); // Clear user state on logout
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleEditProfile = () => {
    setEditModal(true); // Open the modal when edit is clicked
  };

  const closeEditProfile = () => {
    setEditModal(false); // Close the modal when user cancels
  };

  const UpdateSuccess = () => {
    setEditModal(false); 
  };

  if (!user || !user.userName) {
    return <div className="text-center text-gray-600">Loading profile details...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-xl mx-auto mt-16">
      <div className="text-center mb-8">
        <div className="inline-block bg-black text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl font-bold shadow-lg">
          {user.userName ? user.userName.charAt(0).toUpperCase() : 'U'}
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 mt-4">{user.userName || 'N/A'}</h2>
        <p className="text-gray-500">{user.email || 'N/A'}</p>
      </div>

      {/* Profile Details */}
      <div className="space-y-6">
        {/* Username */}
        <div className="flex items-center space-x-4 p-4 rounded-xl bg-white shadow-md hover:bg-gray-50 transition-all duration-300">
          <FaUser className="text-blue-500 text-xl" />
          <div className="flex-1">
            <p className="text-gray-500">Username:</p>
            <p className="font-semibold text-gray-900">{user.userName || 'N/A'}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4 p-4 rounded-xl bg-white shadow-md hover:bg-gray-50 transition-all duration-300">
          <FaEnvelope className="text-blue-500 text-xl" />
          <div className="flex-1">
            <p className="text-gray-500">Email:</p>
            <p className="font-semibold text-gray-900">{user.email || 'N/A'}</p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-center space-x-4 p-4 rounded-xl bg-white shadow-md hover:bg-gray-50 transition-all duration-300">
          <FaPhone className="text-blue-500 text-xl" />
          <div className="flex-1">
            <p className="text-gray-500">Phone Number:</p>
            <p className="font-semibold text-gray-900">{user.phoneNumber || 'N/A'}</p>
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

      {/* Edit Profile Modal */}
      <CommonModal open={editModal} onCancel={closeEditProfile}>
        <UserEditProfile onCancel={closeEditProfile} onOk={UpdateSuccess} />
      </CommonModal>
    </div>
  );
}
