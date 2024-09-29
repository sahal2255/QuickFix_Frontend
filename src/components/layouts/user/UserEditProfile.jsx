import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks
import { setUser } from '../../../Redux/Slices/userSlice'; // Redux action
import CommonForm from '../../common/CommonForm'; // Import the CommonForm component
import { EditProfile } from '../../../services/user/UserSignService'; // Import the API service

const UserEditProfile = ({ onCancel ,onOk}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    userName: user.userName || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
  });

  const handleSubmit = async (values) => {
    try {
      const response = await EditProfile(values); // Call the API
      onOk()

      if (response.status === 200) {
        dispatch(setUser(values)); // Update Redux state
      }
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const formFields = [
    { name: 'userName', label: 'Username', type: 'input', placeholder: 'Enter your username' },
    { name: 'email', label: 'Email', type: 'input', placeholder: 'Enter your email' },
    { name: 'phoneNumber', label: 'Phone Number', type: 'input', placeholder: 'Enter your phone number' },
  ];

  return (
    <CommonForm
      formFields={formFields}
      initialValues={formData}
      onSubmit={handleSubmit}
    />
  );
};

export default UserEditProfile;
