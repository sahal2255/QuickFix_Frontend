import axios from 'axios';
import Cookies from 'js-cookie';  // Ensure you have this or use an appropriate cookie handling library

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:3002';
console.log('Backend URL:', url);

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    console.log('Attempting to refresh access token...');
    // Call your refresh token endpoint
    const response = await instance.get('/refresh-token');
    console.log('Access token refreshed successfully:', response);
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // If token has expired and it is not a retry request
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.log('Access token expired, attempting to refresh...');
      originalRequest._retry = true;
      try {
        await refreshAccessToken();  // Attempt to refresh token
        const newAccessToken = Cookies.get('accessToken'); // Get new access token from cookies
        console.log('New access token retrieved from cookies:', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        console.log('Retrying original request with new access token...');
        return instance(originalRequest);  // Retry the original request with new token
      } catch (err) {
        console.error('Error refreshing token:', err);
        // Handle error (e.g., redirect to login)
        return Promise.reject(err);
      }
    }

    console.error('Request failed:', error);
    return Promise.reject(error);
  }
);

export default instance;
