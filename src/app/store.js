import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import articlesReducer from '../features/articles/articlesSlice';
import usersReducer from '../features/users/usersSlice';
import adminReducer from '../features/admin/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
    users: usersReducer,
    admin: adminReducer,
  },
});
