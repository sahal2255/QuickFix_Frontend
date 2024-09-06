import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Make sure axios is imported

const UserProtec = () => {
    const [authenticated, setAuthenticated] = useState(null);  // Start as null to indicate loading state
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('/CheckAuth');
                if (response.status === 200) {
                    setAuthenticated(true);  // User is authenticated
                } else {
                    setAuthenticated(false);  // Failed authentication
                }
            } catch (error) {
                console.error('Error during authentication check:', error);
                setAuthenticated(false);  // If an error occurs, treat it as unauthenticated
                navigate('/login');  // Redirect to login page if not authenticated
            }
        };

        checkAuthentication();
    }, [navigate]);

    if (authenticated === null) {
        return <div>Loading...</div>;  // Show loading state while authentication is being checked
    }

    if (!authenticated) {
        return <Navigate to="/login" />;  // Redirect to login if not authenticated
    }

    return <Outlet />;  // Render protected routes (children) here
};

export default UserProtec;
