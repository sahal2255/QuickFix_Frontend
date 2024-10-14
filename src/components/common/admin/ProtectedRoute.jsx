import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='));
      if (token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (authenticated === null) {
    return <Spinner />; // Loading indicator
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />; // Redirect to login
  }

  return children;
};

export default ProtectedRoute;
