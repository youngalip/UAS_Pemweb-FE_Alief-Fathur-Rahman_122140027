import api from '../../utils/api'; // sesuaikan path sesuai struktur proyek Anda

const communityAPI = {
  getThreads: (params) => api.get('/community/threads', { params }),
  
  getThreadById: (id) => api.get(`/community/threads/${id}`),
  
  createThread: (threadData) => api.post('/community/threads', threadData),
  
  updateThread: (id, threadData) => api.put(`/community/threads/${id}`, threadData),
  
  deleteThread: (id) => api.delete(`/community/threads/${id}`),
  
  addComment: (threadId, commentData) => api.post(`/community/threads/${threadId}/comments`, commentData),
  
  deleteComment: (threadId, commentId) => api.delete(`/community/threads/${threadId}/comments/${commentId}`),
};

export default communityAPI;
