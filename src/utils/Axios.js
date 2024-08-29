import axios from 'axios';
const url=import.meta.env.VITE_BASE_URL||'http://localhost:3002'
console.log('backend url ',url)


const instance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default instance;
