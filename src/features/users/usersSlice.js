import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from './usersAPI';

// Get user profile
export const fetchUserProfile = createAsyncThunk(
  'users/fetchUserProfile',
  async (username, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserProfile(username);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }
);

// Get current user profile
export const fetchCurrentUserProfile = createAsyncThunk(
  'users/fetchCurrentUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getCurrentUserProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch current user profile');
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  'users/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateProfile(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

// Upload profile picture
export const uploadProfilePicture = createAsyncThunk(
  'users/uploadProfilePicture',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await userAPI.uploadProfilePicture(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload profile picture');
    }
  }
);

// Follow user
export const followUser = createAsyncThunk(
  'users/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userAPI.followUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to follow user');
    }
  }
);

// Unfollow user
export const unfollowUser = createAsyncThunk(
  'users/unfollowUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userAPI.unfollowUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to unfollow user');
    }
  }
);

// Get user followers
export const fetchUserFollowers = createAsyncThunk(
  'users/fetchUserFollowers',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserFollowers(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user followers');
    }
  }
);

// Get user following
export const fetchUserFollowing = createAsyncThunk(
  'users/fetchUserFollowing',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserFollowing(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user following');
    }
  }
);

// Get saved articles
export const fetchSavedArticles = createAsyncThunk(
  'users/fetchSavedArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserSavedArticles();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch saved articles');
    }
  }
);

const initialState = {
  currentProfile: null,
  followers: [],
  following: [],
  savedArticles: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsersStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch current user profile
      .addCase(fetchCurrentUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentProfile = action.payload;
      })
      .addCase(fetchCurrentUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.currentProfile = action.payload;
      })
      
      // Upload profile picture
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        if (state.currentProfile) {
          state.currentProfile.avatarUrl = action.payload.avatarUrl;
        }
      })
      
      // Follow user
      .addCase(followUser.fulfilled, (state, action) => {
        if (state.currentProfile) {
          state.currentProfile.isFollowing = true;
          state.currentProfile.followersCount += 1;
        }
      })
      
      // Unfollow user
      .addCase(unfollowUser.fulfilled, (state, action) => {
        if (state.currentProfile) {
          state.currentProfile.isFollowing = false;
          state.currentProfile.followersCount -= 1;
        }
      })
      
      // Fetch user followers
      .addCase(fetchUserFollowers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserFollowers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.followers = action.payload;
      })
      .addCase(fetchUserFollowers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch user following
      .addCase(fetchUserFollowing.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserFollowing.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.following = action.payload;
      })
      .addCase(fetchUserFollowing.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch saved articles
      .addCase(fetchSavedArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.savedArticles = action.payload;
      })
      .addCase(fetchSavedArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetUsersStatus } = usersSlice.actions;

export default usersSlice.reducer;
