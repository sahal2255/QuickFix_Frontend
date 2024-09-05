import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { RefreshToken } from '../../../services/user/TokenService';

const UserProtec = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            const accessToken = Cookies.get('accessToken');  // Get access token from cookies
            console.log('the access token in frontend',accessToken);
            
            if (accessToken) {
                setAuthenticated(true);  // User has access token
            } else {
                try {
                    // Attempt to refresh token if access token is missing/expired
                    const response = await RefreshToken();
                    if (response?.status === 200) {
                        // Refresh successful, set new access token
                        setAuthenticated(true);
                    } else {
                        setAuthenticated(false);  // Failed to refresh
                        navigate('/login');  // Redirect to login
                    }
                } catch (error) {
                    console.error('Error refreshing token:', error);
                    setAuthenticated(false);  // Error in refreshing token
                    navigate('/login');  // Redirect to login
                }
            }
        };

        checkAuthentication();
    }, [navigate]);

    if (authenticated === null) {
        return <div>Loading...</div>;  // Show loading state while authentication is checked
    }

    if (authenticated === false) {
        return <Navigate to="/login" />;  // Redirect to login if not authenticated
    }

    return children;  // Render children (protected components) if authenticated
};

export default UserProtec;
