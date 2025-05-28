import axios from 'axios';

const API_URL = '/api/admin';

const adminAPI = {
  // Dashboard
  getDashboardStats: () => {
    return axios.get(`${API_URL}/stats`);
  },

  // Articles
  getArticles: (params) => {
    return axios.get(`${API_URL}/articles`, { params });
  },
  
  getArticle: (id) => {
    return axios.get(`${API_URL}/articles/${id}`);
  },
  
  createArticle: (articleData) => {
    return axios.post(`${API_URL}/articles`, articleData);
  },
  
  updateArticle: (id, articleData) => {
    return axios.put(`${API_URL}/articles/${id}`, articleData);
  },
  
  deleteArticle: (id) => {
    return axios.delete(`${API_URL}/articles/${id}`);
  },

  // Categories
  getCategories: () => {
    return axios.get(`${API_URL}/categories`);
  },
  
  createCategory: (categoryData) => {
    return axios.post(`${API_URL}/categories`, categoryData);
  },
  
  updateCategory: (id, categoryData) => {
    return axios.put(`${API_URL}/categories/${id}`, categoryData);
  },
  
  deleteCategory: (id) => {
    return axios.delete(`${API_URL}/categories/${id}`);
  },

  // Users
  getUsers: (params) => {
    return axios.get(`${API_URL}/users`, { params });
  },
  
  getUser: (id) => {
    return axios.get(`${API_URL}/users/${id}`);
  },
  
  updateUser: (id, userData) => {
    return axios.put(`${API_URL}/users/${id}`, userData);
  },
  
  updateUserRole: (id, role) => {
    return axios.patch(`${API_URL}/users/${id}/role`, { role });
  },
  
  deleteUser: (id) => {
    return axios.delete(`${API_URL}/users/${id}`);
  },

  // Comments
  getComments: (params) => {
    return axios.get(`${API_URL}/comments`, { params });
  },
  
  deleteComment: (id) => {
    return axios.delete(`${API_URL}/comments/${id}`);
  },

  // Analytics
  getAnalytics: (period) => {
    return axios.get(`${API_URL}/analytics`, { params: { period } });
  }
};

export default adminAPI;
