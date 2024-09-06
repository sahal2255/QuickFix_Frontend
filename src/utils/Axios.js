import axios from 'axios';
const url=import.meta.env.VITE_BASE_URL||'http://localhost:3002'
console.log('backend url ',url)


const instance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default instance;


// axios.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
    
//     // If token has expired and it is not a retry request
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       await refreshAccessToken();  // Attempt to refresh token
//       const newAccessToken = Cookies.get('accessToken'); // Get new access token
//       originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//       return axios(originalRequest);  // Retry the original request with new token
//     }

//     return Promise.reject(error);
//   }
// );