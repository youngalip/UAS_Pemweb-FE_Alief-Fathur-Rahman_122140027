// src/features/articles/articlesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import articlesAPI from './articlesAPI';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await articlesAPI.getArticles();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch articles');
    }
  }
);

export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await articlesAPI.getArticleById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch article');
    }
  }
);

export const fetchUserArticles = createAsyncThunk(
  'articles/fetchUserArticles',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await articlesAPI.getUserArticles(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user articles');
    }
  }
);

// Modifikasi di fetchCategories di articlesSlice.js
export const fetchCategories = createAsyncThunk(
  'articles/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await articlesAPI.getCategories();
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      
      // Kembalikan pesan error yang lebih deskriptif
      return rejectWithValue(
        error.response?.data?.message || 
        `Failed to fetch categories: ${error.message}`
      );
    }
  }
);

export const addComment = createAsyncThunk(
  'articles/addComment',
  async ({ articleId, comment }, { rejectWithValue }) => {
    try {
      const response = await articlesAPI.addComment(articleId, comment);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

// Tambahkan di bagian createAsyncThunk lainnya di articlesSlice.js
export const fetchRelatedArticles = createAsyncThunk(
  'articles/fetchRelatedArticles',
  async ({ categoryId, articleId, tags }, { rejectWithValue }) => {
    try {
      const response = await articlesAPI.getRelatedArticles({ categoryId, articleId, tags });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch related articles');
    }
  }
);

const initialState = {
  articles: [],
  currentArticle: null,
  userArticles: [],
  relatedArticles: [], // Tambahkan ini
  categories: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};



const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    resetArticlesStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pastikan juga menambahkan reducer untuk fetchRelatedArticles di extraReducers
      .addCase(fetchRelatedArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRelatedArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.relatedArticles = action.payload;
      })
      .addCase(fetchRelatedArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })    
      // Fetch Articles
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles || []; // Ambil array articles dari response
        state.meta = action.payload.meta || {}; // Simpan juga meta data jika perlu
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch Article By Id
      .addCase(fetchArticleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch User Articles
      .addCase(fetchUserArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userArticles = action.payload;
      })
      .addCase(fetchUserArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch Categories
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
      
      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.currentArticle) {
          state.currentArticle.comments.push(action.payload);
        }
      });
  },
});

export const { resetArticlesStatus } = articlesSlice.actions;

export default articlesSlice.reducer;
