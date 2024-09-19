import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import instance from '../../../utils/Axios'

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
            setAuthenticated(false);
            navigate('/login');
          }
        };
    
        checkAuthentication();
      }, [navigate]);

    if (authenticated === null) {
        return <div>Loading...</div>;  
    }

    if (!authenticated) { 
        return <Navigate to="/login" />;  
    }

    return <Outlet />;  
} 

export default UserProtec;
