import axios from 'axios';

const API_URL = '/api/users';

const userAPI = {
  // Get user profile by username
  getUserProfile: (username) => {
    return axios.get(`${API_URL}/profile/${username}`);
  },
  
  // Get current user profile
  getCurrentUserProfile: () => {
    return axios.get(`${API_URL}/me`);
  },
  
  // Update user profile
  updateProfile: (userData) => {
    return axios.put(`${API_URL}/profile`, userData);
  },
  
  // Upload profile picture
  uploadProfilePicture: (formData) => {
    return axios.post(`${API_URL}/profile/picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  // Follow a user
  followUser: (userId) => {
    return axios.post(`${API_URL}/${userId}/follow`);
  },
  
  // Unfollow a user
  unfollowUser: (userId) => {
    return axios.delete(`${API_URL}/${userId}/follow`);
  },
  
  // Get user followers
  getUserFollowers: (userId) => {
    return axios.get(`${API_URL}/${userId}/followers`);
  },
  
  // Get users that a user is following
  getUserFollowing: (userId) => {
    return axios.get(`${API_URL}/${userId}/following`);
  },
  
  // Get user liked articles
  getUserLikedArticles: (userId) => {
    return axios.get(`${API_URL}/${userId}/likes`);
  },
  
  // Get user saved articles
  getUserSavedArticles: () => {
    return axios.get(`${API_URL}/me/saved`);
  },
  
  // Save an article
  saveArticle: (articleId) => {
    return axios.post(`${API_URL}/me/saved/${articleId}`);
  },
  
  // Unsave an article
  unsaveArticle: (articleId) => {
    return axios.delete(`${API_URL}/me/saved/${articleId}`);
  },
  
  // Change password
  changePassword: (passwordData) => {
    return axios.put(`${API_URL}/me/password`, passwordData);
  }
};

export default userAPI;
