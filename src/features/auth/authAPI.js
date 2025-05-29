import axios from 'axios';

const API_URL = '/api';

// Buat instance axios dengan baseURL
const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Hapus jika backend tidak pakai cookie-based auth
});

// Interceptor untuk menyisipkan token JWT di header Authorization
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  logout: () => API.post('/auth/logout'),
  checkAuth: () => API.get('/auth/me'),
};

export default authAPI;
