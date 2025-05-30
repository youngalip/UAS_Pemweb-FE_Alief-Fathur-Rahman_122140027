import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminAPI from './adminAPI';

// Dashboard
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getDashboardStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  }
);

// Articles
export const fetchArticles = createAsyncThunk(
  'admin/fetchArticles',
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getArticles(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch articles');
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'admin/deleteArticle',
  async (id, { rejectWithValue }) => {
    try {
      await adminAPI.deleteArticle(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete article');
    }
  }
);

// Categories
export const fetchCategories = createAsyncThunk(
  'admin/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const addCategory = createAsyncThunk(
  'admin/addCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await adminAPI.createCategory(categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add category');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'admin/updateCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await adminAPI.updateCategory(categoryData.id, categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update category');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'admin/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await adminAPI.deleteCategory(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
    }
  }
);

// Users
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getUsers(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.updateUserRole(userId, role);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user role');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await adminAPI.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

// Analytics
export const fetchAnalytics = createAsyncThunk(
  'admin/fetchAnalytics',
  async (period, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getAnalytics(period);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch analytics');
    }
  }
);

// Tambahkan di bagian createAsyncThunk di adminSlice.js
export const fetchAdminStats = createAsyncThunk(
  'admin/fetchAdminStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getDashboardStats();
      console.log('Dashboard stats response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching admin stats:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin stats');
    }
  }
);

const initialState = {
  stats: {
    totalUsers: 0,
    totalArticles: 0,
    totalViews: 0,
    totalComments: 0,
    recentActivities: [],
    popularArticles: [],
  },
  articles: [],
  categories: [],
  users: [],
  comments: [],
  analytics: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};


const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pastikan juga menambahkan reducer untuk fetchAdminStats di extraReducers
      .addCase(fetchAdminStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload.stats || action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })    
      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload.stats || action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Articles
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles || action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(article => article.id !== action.payload);
      })
      
      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
            // Categories (continued)
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
      })
      
      // Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      
      // Analytics
      .addCase(fetchAnalytics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.analytics = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetAdminStatus } = adminSlice.actions;

export default adminSlice.reducer;

