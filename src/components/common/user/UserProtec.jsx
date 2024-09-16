import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import instance from '../../../utils/Axios'
// import axios from 'axios';

const UserProtec = () => {
    const [authenticated, setAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
          try {
            const response = await instance.get('/verify-token');
            if (response.status === 200) {
              setAuthenticated(true);
            } else {
              setAuthenticated(false);
            }
          } catch (error) {
            console.error('Authentication error:', error);
            setAuthenticated(false);
            navigate('/login');
          }
        };
    
        checkAuthentication();
      }, [navigate]);

    if (authenticated === null) {
        return <div>Loading...</div>;  // Loading state while authentication is being checked
    }

    if (!authenticated) {
        return <Navigate to="/login" />;  // Redirect to login if not authenticated
    }

    return <Outlet />;  // Render protected routes (children)
};

export default UserProtec;
