import React, { useEffect, useState } from 'react';
import { VendorProfileGet } from '../../../services/vendor/ProfileService'
import { useNavigate } from 'react-router-dom';
import CommonModal from '../../common/CommonModal';
import EditProfileForm from './EditProfileForm';

export default function VendorProfile() {
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewModal,setViewModal]=useState(false)
  const navigate=useNavigate()


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await VendorProfileGet();
        setVendorData(data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.log('Error fetching profile:', error);
        setLoading(false); // Even in case of error, stop loading
      }
    };
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    console.log('Edit Profile clicked');
    setViewModal(true)
  };
  const closeEditModal=()=>{
    setViewModal(false)
  }
  const handleLogout = async() => {
   console.log('heloo world');
   
  };

  const handleUpdatedProfile=(updatedData)=>{
    setVendorData(updatedData)
    closeEditModal()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!vendorData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl font-semibold text-red-500">Failed to load vendor data</div>
      </div>
    );
  }

  return (
    <div className="my-40 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          <div className="bg-gray-800 flex items-center justify-center">
            <div className="text-center p-8">
              <img
                className="h-40 w-40 rounded-full border-4 border-white shadow-md mx-auto"
                src={vendorData.image}
                alt={vendorData.name}
              />
              <h2 className="text-3xl font-bold text-white mt-4">{vendorData.name}</h2>
              {/* <p className="text-gray-200">Vendor ID: {vendorData._id}</p> */}
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-600">{vendorData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Phone:</span>
                <span className="text-gray-600">{vendorData.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Registration ID:</span>
                <span className="text-gray-600">{vendorData.regId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Location:</span>
                <span className="text-gray-600">{vendorData.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Status:</span>
                {vendorData.isEnabled ? (
                  <span className="text-green-600 font-bold">Enabled</span>
                ) : (
                  <span className="text-red-600 font-bold">Disabled</span>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">Amenities:</h3>
              <ul className="flex space-x-3 mt-2">
                {vendorData.amenities.map((amenity, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={handleEditProfile}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-200"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-6 rounded-lg shadow hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <CommonModal open={viewModal} onCancel={closeEditModal}>
            <EditProfileForm onCancel={closeEditModal} initialData={vendorData} onUpdateSuccess={handleUpdatedProfile}/>
      </CommonModal>
    </div>
  );
}
