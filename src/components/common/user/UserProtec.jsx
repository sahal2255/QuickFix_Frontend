import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import instance from '../../../utils/Axios';  // Axios instance
import { clearUser } from '../../../Redux/Slices/userSlice';
import { useDispatch } from 'react-redux';

const UserProtec = ({ isAuthPage = false, children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // API call to verify the token and check authentication
        const response = await instance.get('/verify-token');
        if (response.status === 200) {
          setAuthenticated(true);  // User is authenticated
        } else {
          setAuthenticated(false);  // User is not authenticated
          dispatch(clearUser());
        }
      } catch (error) {
        setAuthenticated(false);  // Handle token verification failure
        dispatch(clearUser());
      }
    };

    if (authenticated === null) {
      checkAuthentication();
    }
  }, [dispatch, navigate]);

  if (authenticated === null) {
    // Display loading state while checking authentication
    return <div>Loading...</div>;
  }

  // If user is authenticated and tries to access login/signup, redirect to the service page or another protected page
  if (authenticated && isAuthPage) {
    return <Navigate to="/" />;
  }

  // If user is not authenticated and tries to access a protected page, redirect to login
  if (!authenticated && !isAuthPage) {
    return <Navigate to="/login" />;
  }

  // Render the children if it is an auth page (login/signup) or protected content
  return isAuthPage ? children : <Outlet />;
};

export default UserProtec;
