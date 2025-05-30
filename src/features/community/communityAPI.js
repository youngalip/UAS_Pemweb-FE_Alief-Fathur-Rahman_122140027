// src/features/community/communityAPI.js
import api from '../../utils/api';

const communityAPI = {
  getThreads: async () => {
    try {
      console.log('API call: getThreads');
      const response = await api.get('/community/threads');
      console.log('API response length:', response.data?.length || 0);
      return response.data;
    } catch (error) {
      console.error('API error in getThreads:', error.response?.data || error.message);
      throw error;
    }
  },
  
  getThreadById: async (threadId) => {  // Ubah nama sesuai dengan thunk fetchThreadById
    try {
      console.log('API call: getThreadById with ID:', threadId);
      const response = await api.get(`/community/threads/${threadId}`);
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API error in getThreadById:', error.response?.data || error.message);
      throw error;
    }
  },
  
  createThread: async (threadData) => {
    const response = await api.post('/community/threads', threadData);
    return response.data;
  },
  
  updateThread: async (threadId, threadData) => {
    const response = await api.put(`/community/threads/${threadId}`, threadData);
    return response.data;
  },
  
  deleteThread: async (threadId) => {
    const response = await api.delete(`/community/threads/${threadId}`);
    return response.data;
  },
  
  addComment: async (threadId, commentData) => {
    // Pastikan thread_id tidak perlu dikirim karena sudah ada di URL
    const { thread_id, ...cleanedData } = commentData;
    const response = await api.post(`/community/threads/${threadId}/comments`, cleanedData);
    return response.data;
  },
  
  deleteComment: async (threadId, commentId) => {
    const response = await api.delete(`/community/threads/${threadId}/comments/${commentId}`);
    return response.data;
  }
};

export default communityAPI;
