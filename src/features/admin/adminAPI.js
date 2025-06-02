// src/features/admin/adminAPI.js
import api from '../../utils/api'; // sesuaikan path ke file api.js

const adminAPI = {
  // Dashboard
  getDashboardStats: () => {
    return api.get('/admin/stats');
  },

  // Articles
  getArticles: (params) => {
    return api.get('/admin/articles', { params });
  },
  
  getArticle: (id) => {
    return api.get(`/admin/articles/${id}`);
  },
  
  createArticle: (articleData) => {
    return api.post('/admin/articles', articleData);
  },
  
  updateArticle: (id, articleData) => {
    return api.put(`/admin/articles/${id}`, articleData);
  },
  
  deleteArticle: (id) => {
    return api.delete(`/admin/articles/${id}`);
  },

  // Threads / Komunitas
  getThreads: (params) => {
    return api.get('/admin/threads', { params });
  },

  getThread: (id) => {
    return api.get(`/admin/threads/${id}`);
  },

  deleteThread: (id) => {
    return api.delete(`/admin/threads/${id}`);
  },

  // Categories
  getCategories: () => {
    return api.get('/admin/categories');
  },
  
  createCategory: (categoryData) => {
    return api.post('/admin/categories', categoryData);
  },
  
  updateCategory: (id, categoryData) => {
    return api.put(`/admin/categories/${id}`, categoryData);
  },
  
  deleteCategory: (id) => {
    return api.delete(`/admin/categories/${id}`);
  },

  // Users
  getUsers: (params) => {
    return api.get('/admin/users', { params });
  },
  
  getUser: (id) => {
    return api.get(`/admin/users/${id}`);
  },
  
  updateUser: (id, userData) => {
    return api.put(`/admin/users/${id}`, userData);
  },
  
  updateUserRole: (id, role) => {
    return api.patch(`/admin/users/${id}/role`, { role });
  },
  
  deleteUser: (id) => {
    return api.delete(`/admin/users/${id}`);
  },

  // Comments
  getComments: (params) => {
    return api.get('/admin/comments', { params });
  },
  
  deleteComment: (id) => {
    return api.delete(`/admin/comments/${id}`);
  },

  // Analytics
  getAnalytics: (period) => {
    return api.get('/admin/analytics', { params: { period } });
  }
};

export default adminAPI;
