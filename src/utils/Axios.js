import axios from 'axios';
import Cookies from 'js-cookie';  // For handling cookies in the frontend

const url = 'https://quickfix-gz1l.onrender.com' ;

const instance = axios.create({
  baseURL: url,
  withCredentials: true, // Allows cookies to be sent along with requests
});

const refreshAccessToken = async () => {
  try {
    console.log('Attempting to refresh access token...');
    const response = await instance.get('/refresh-token');  // Call refresh token endpoint
    console.log('Access token refreshed successfully:', response.data);
    return response.data;  // Assuming the new access token comes in response
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

// Axios response interceptor to handle 401 status and retry after refreshing token
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Check if access token is expired and it is not already retried
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        const { accessToken } = await refreshAccessToken(); // Refresh the access token

        // Update the original request's Authorization header with the new token
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        Cookies.set('accessToken', accessToken); // Update the access token in cookies

        return instance(originalRequest); // Retry the original request with the new access token
      } catch (err) {
        console.error('Error refreshing token:', err);
        return Promise.reject(err);  // Reject the request if refresh fails
      }
    }

    return Promise.reject(error);  // Reject other errors
  }
);

export default instance;
