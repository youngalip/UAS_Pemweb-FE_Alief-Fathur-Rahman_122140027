import axios from 'axios';

const API_URL = '/api/articles';

const articlesAPI = {
  // Get all articles with optional filters
  getArticles: (params) => {
    return axios.get(API_URL, { params });
  },
  
  // Get a single article by ID
  getArticleById: (id) => {
    return axios.get(`${API_URL}/${id}`);
  },
  
  // Get articles by user ID
  getUserArticles: (userId) => {
    return axios.get(`/api/users/${userId}/articles`);
  },
  
  // Get related articles
  getRelatedArticles: ({ categoryId, articleId, tags, limit = 6 }) => {
    return axios.get(`${API_URL}/related`, { 
      params: { categoryId, articleId, tags, limit } 
    });
  },
  
  // Get popular articles
  getPopularArticles: (limit = 5) => {
    return axios.get(`${API_URL}/popular`, { params: { limit } });
  },
  
  // Get article categories
  getCategories: () => {
    return axios.get('/api/categories');
  },
  
  // Create a new article
  createArticle: (articleData) => {
    return axios.post(API_URL, articleData);
  },
  
  // Update an existing article
  updateArticle: (id, articleData) => {
    return axios.put(`${API_URL}/${id}`, articleData);
  },
  
  // Delete an article
  deleteArticle: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  },
  
  // Add a comment to an article
  addComment: (articleId, comment) => {
    return axios.post(`${API_URL}/${articleId}/comments`, comment);
  },
  
  // Delete a comment
  deleteComment: (articleId, commentId) => {
    return axios.delete(`${API_URL}/${articleId}/comments/${commentId}`);
  },
  
  // Like an article
  likeArticle: (articleId) => {
    return axios.post(`${API_URL}/${articleId}/like`);
  },
  
  // Unlike an article
  unlikeArticle: (articleId) => {
    return axios.delete(`${API_URL}/${articleId}/like`);
  },
  
  // Search articles
  searchArticles: (query) => {
    return axios.get(`${API_URL}/search`, { params: { q: query } });
  }
};

export default articlesAPI;
