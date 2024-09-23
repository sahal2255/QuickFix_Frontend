import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import instance from '../../../utils/Axios';  // Axios instance

const UserProtec = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // API call to verify the token and check authentication
        const response = await instance.get('/verify-token');

        if (response.status === 200) {
          setAuthenticated(true);  // User is authenticated
        } else {
          setAuthenticated(false);  // User is not authenticated, navigate to login
          navigate('/login');
        }
      } catch (error) {
        setAuthenticated(false);  // Handle token verification failure
        navigate('/login');  // Navigate to login on error
      }
    };

    if (authenticated === null) {
      // Only call this once when authenticated is null (initial state)
      checkAuthentication();
    }
  }, [ navigate]);

  if (authenticated === null) {
    // Display loading state while checking authentication
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // Render protected child routes if authenticated
  return <Outlet />;
};

export default UserProtec;
