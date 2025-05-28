import axios from 'axios';

const API_URL = '/api';

// Buat instance axios dengan baseURL
const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // jika backend menggunakan cookie-based auth; bisa dihapus kalau pakai token header
});

// Interceptor untuk menyisipkan token JWT di header Authorization
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Sesuaikan nama key token di localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const authAPI = {
  login: (credentials) => {
    return API.post('/auth/login', credentials);
  },
  
  register: (userData) => {
    return API.post('/auth/register', userData);
  },
  
  logout: () => {
    return API.post('/auth/logout');
  },
  
  checkAuth: () => {
    return API.get('/auth/me');
  },
};

export default authAPI;
