// src/features/community/communitySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import communityAPI from './communityAPI';

export const fetchThreads = createAsyncThunk(
  'community/fetchThreads',
  async (_, { rejectWithValue }) => {
    try {
      const data = await communityAPI.getThreads();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch threads');
    }
  }
);

export const fetchThreadById = createAsyncThunk(
  'community/fetchThreadById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await communityAPI.getThreadById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch thread');
    }
  }
);

export const createThread = createAsyncThunk(
  'community/createThread',
  async (threadData, { rejectWithValue }) => {
    try {
      const data = await communityAPI.createThread(threadData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create thread');
    }
  }
);

export const updateThread = createAsyncThunk(
  'community/updateThread',
  async ({ threadId, threadData }, { rejectWithValue }) => {
    try {
      const data = await communityAPI.updateThread(threadId, threadData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update thread');
    }
  }
);

export const deleteThread = createAsyncThunk(
  'community/deleteThread',
  async (id, { rejectWithValue }) => {
    try {
      await communityAPI.deleteThread(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete thread');
    }
  }
);

export const addComment = createAsyncThunk(
  'community/addComment',
  async ({ threadId, commentData }, { rejectWithValue, getState }) => {
    try {
      const response = await communityAPI.addComment(threadId, commentData);
      
      // Tambahkan data user dari state jika tidak lengkap di response
      const { auth } = getState();
      if (auth.user) {
        response.user = {
          ...response.user || {},
          username: auth.user.username,
          avatar_url: auth.user.avatar_url
        };
      }
      
      return { ...response, threadId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to add comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'community/deleteComment',
  async ({ threadId, commentId }, { rejectWithValue }) => {
    try {
      await communityAPI.deleteComment(threadId, commentId);
      return { threadId, commentId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete comment');
    }
  }
);

const initialState = {
  threads: [],
  currentThread: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    resetCommunityStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    clearCurrentThread: (state) => {
      state.currentThread = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch threads
      .addCase(fetchThreads.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Reset error saat loading
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threads = action.payload;
        state.error = null;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch thread by ID
      .addCase(fetchThreadById.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Reset error saat loading
      })
      .addCase(fetchThreadById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentThread = action.payload;
        state.error = null;
      })
      .addCase(fetchThreadById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Create thread
      .addCase(createThread.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Reset error saat loading
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threads.unshift(action.payload);
        state.error = null;
      })
      .addCase(createThread.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update thread
      .addCase(updateThread.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Reset error saat loading
      })
      .addCase(updateThread.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.threads.findIndex(thread => thread.id === action.payload.id);
        if (index !== -1) {
          state.threads[index] = action.payload;
        }
        if (state.currentThread?.id === action.payload.id) {
          state.currentThread = action.payload;
        }
        state.error = null;
      })
      .addCase(updateThread.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Delete thread
      .addCase(deleteThread.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Reset error saat loading
      })
      .addCase(deleteThread.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.threads = state.threads.filter(thread => thread.id !== action.payload);
        if (state.currentThread?.id === action.payload) {
          state.currentThread = null;
        }
        state.error = null;
      })
      .addCase(deleteThread.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Add comment
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Reset error saat loading
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.currentThread) {
          // Pastikan array comments ada
          if (!state.currentThread.comments) {
            state.currentThread.comments = [];
          }
          
          state.currentThread.comments.push(action.payload);
          
          // Update comment count in thread list
          const threadIndex = state.threads.findIndex(t => t.id === parseInt(action.payload.threadId));
          if (threadIndex !== -1) {
            state.threads[threadIndex].comment_count = (state.threads[threadIndex].comment_count || 0) + 1;
          }
        }
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Reset error saat loading
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.currentThread && state.currentThread.comments) {
          state.currentThread.comments = state.currentThread.comments.filter(
            comment => comment.id !== action.payload.commentId
          );
          
          // Update comment count in thread list
          const threadIndex = state.threads.findIndex(t => t.id === action.payload.threadId);
          if (threadIndex !== -1 && state.threads[threadIndex].comment_count > 0) {
            state.threads[threadIndex].comment_count -= 1;
          }
        }
        state.error = null;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { resetCommunityStatus, clearCurrentThread } = communitySlice.actions;
export default communitySlice.reducer;
