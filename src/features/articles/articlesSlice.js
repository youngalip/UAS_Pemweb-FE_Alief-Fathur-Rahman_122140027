// src/features/articles/articlesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import articlesAPI from './articlesAPI';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const data = await articlesAPI.getArticles();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch articles');
    }
  }
);

export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await articlesAPI.getArticleById(id);
      return data;
    } catch (error) {
      console.error('Error in fetchArticleById:', error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        'Failed to fetch article'
      );
    }
  }
);

export const fetchUserArticles = createAsyncThunk(
  'articles/fetchUserArticles',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await articlesAPI.getUserArticles(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user articles');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'articles/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await articlesAPI.getCategories();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return rejectWithValue(
        error.response?.data?.message || 
        `Failed to fetch categories: ${error.message}`
      );
    }
  }
);

export const addComment = createAsyncThunk(
  'articles/addComment',
  async ({ articleId, comment }, { rejectWithValue, getState }) => {
    try {
      const data = await articlesAPI.addComment(articleId, comment);
      
      // Tambahkan data user dari state jika tidak ada di response
      const { auth } = getState();
      if (auth.user && (!data.user || !data.user.username)) {
        data.user = {
          id: auth.user.id,
          username: auth.user.username,
          avatar_url: auth.user.avatar_url
        };
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

export const fetchRelatedArticles = createAsyncThunk(
  'articles/fetchRelatedArticles',
  async ({ categoryId, articleId, tags }, { rejectWithValue }) => {
    try {
      const data = await articlesAPI.getRelatedArticles({ categoryId, articleId, tags });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch related articles');
    }
  }
);

// Thunk untuk CRUD artikel (admin only)
export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (articleData, { rejectWithValue }) => {
    try {
      const data = await articlesAPI.createArticle(articleData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create article');
    }
  }
);

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ id, articleData }, { rejectWithValue }) => {
    try {
      const data = await articlesAPI.updateArticle(id, articleData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update article');
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (id, { rejectWithValue }) => {
    try {
      await articlesAPI.deleteArticle(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete article');
    }
  }
);

const initialState = {
  articles: [],
  currentArticle: null,
  userArticles: [],
  relatedArticles: [],
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
    clearCurrentArticle: (state) => {
      state.currentArticle = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Articles
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle berbagai format response
        if (Array.isArray(action.payload)) {
          state.articles = action.payload;
        } else if (action.payload && action.payload.articles) {
          state.articles = action.payload.articles;
          state.meta = action.payload.meta || {};
        } else {
          state.articles = [];
        }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch Article By Id
      .addCase(fetchArticleById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentArticle = action.payload;
        state.error = null;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch User Articles
      .addCase(fetchUserArticles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userArticles = action.payload;
        state.error = null;
      })
      .addCase(fetchUserArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch Related Articles
      .addCase(fetchRelatedArticles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRelatedArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.relatedArticles = action.payload;
        state.error = null;
      })
      .addCase(fetchRelatedArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Add Comment
      .addCase(addComment.pending, (state) => {
        // Tidak perlu mengubah status loading untuk operasi comment
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.currentArticle && state.currentArticle.comments) {
          state.currentArticle.comments.push(action.payload);
        } else if (state.currentArticle) {
          state.currentArticle.comments = [action.payload];
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        // Tidak perlu mengubah status untuk operasi comment
        console.error('Failed to add comment:', action.payload);
      })
      
      // Create Article (admin only)
      .addCase(createArticle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles.unshift(action.payload);
        state.error = null;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update Article (admin only)
      .addCase(updateArticle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update di articles list
        const index = state.articles.findIndex(article => article.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
        // Update currentArticle jika sedang dilihat
        if (state.currentArticle && state.currentArticle.id === action.payload.id) {
          state.currentArticle = action.payload;
        }
        state.error = null;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Delete Article (admin only)
      .addCase(deleteArticle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = state.articles.filter(article => article.id !== action.payload);
        if (state.currentArticle && state.currentArticle.id === action.payload) {
          state.currentArticle = null;
        }
        state.error = null;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetArticlesStatus, clearCurrentArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
