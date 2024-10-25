import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';
import PreLoader from '../../common/PreLoader'

const VenderProtect = ({children}) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='));
      console.log('Token found:', token);
      if (token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (authenticated === null) {
    return <PreLoader />; 
  }

  if (!authenticated) {
    console.log('Navigating to login'); // Debugging line
    return <Navigate to="/vendor/login" />;
  }

  return children;
};

export default VenderProtect;
