import axios from 'axios';
import Cookies from 'js-cookie';  // Ensure you have this or use an appropriate cookie handling library

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:3002';
console.log('backend url ', url);

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    // Call your refresh token endpoint
    await instance.get('/refresh-token');
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();  // Attempt to refresh token
        const newAccessToken = Cookies.get('accessToken'); // Get new access token from cookies
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);  // Retry the original request with new token
      } catch (err) {
        console.error('Error refreshing token:', err);
        // Handle error (e.g., redirect to login)
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
