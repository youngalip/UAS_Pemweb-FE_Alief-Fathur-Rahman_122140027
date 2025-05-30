// src/features/articles/articlesAPI.js
import api from '../../utils/api';  // Gunakan instance API yang sudah dibuat

const articlesAPI = {
  // Get all articles with optional filters
  getArticles: async (params) => {
    const response = await api.get('/articles', { params });
    return response.data;
  },
  
  // Get a single article by ID
  getArticleById: async (id) => {
    try {
      console.log(`Fetching article with ID: ${id}`);
      const response = await api.get(`/articles/${id}`);
      console.log('Article data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching article:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Get articles by user ID
  getUserArticles: async (userId) => {
    const response = await api.get(`/users/${userId}/articles`);
    return response.data;
  },
  
  // Get related articles
  getRelatedArticles: async ({ categoryId, articleId, tags, limit = 6 }) => {
    const response = await api.get(`/articles/related`, { 
      params: { categoryId, articleId, tags, limit } 
    });
    return response.data;
  },
  
  // Get popular articles
  getPopularArticles: async (limit = 5) => {
    const response = await api.get(`/articles/popular`, { params: { limit } });
    return response.data;
  },
  
  // Get article categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  
  // Create a new article (admin only)
  createArticle: async (articleData) => {
    const response = await api.post('/articles', articleData);
    return response.data;
  },
  
  // Update an existing article (admin only)
  updateArticle: async (id, articleData) => {
    const response = await api.put(`/articles/${id}`, articleData);
    return response.data;
  },
  
  // Delete an article (admin only)
  deleteArticle: async (id) => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  },
  
  // Add a comment to an article
  addComment: async (articleId, comment) => {
    const response = await api.post(`/articles/${articleId}/comments`, comment);
    return response.data;
  },
  
  // Delete a comment
  deleteComment: async (articleId, commentId) => {
    const response = await api.delete(`/articles/${articleId}/comments/${commentId}`);
    return response.data;
  },
  
  // Like an article
  likeArticle: async (articleId) => {
    const response = await api.post(`/articles/${articleId}/like`);
    return response.data;
  },
  
  // Unlike an article
  unlikeArticle: async (articleId) => {
    const response = await api.delete(`/articles/${articleId}/like`);
    return response.data;
  },
  
  // Search articles
  searchArticles: async (query) => {
    const response = await api.get(`/articles/search`, { params: { q: query } });
    return response.data;
  }
};

export default articlesAPI;
