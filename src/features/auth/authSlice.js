import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from './authAPI';

// Thunk untuk login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Thunk untuk register
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Thunk untuk logout
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await authAPI.logout();
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
});

// Thunk untuk cek autentikasi (misal saat load app)
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      // Cek dulu apakah ada token di localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }

      try {
        // Coba verifikasi token dengan backend
        const response = await authAPI.checkAuth();
        return response.data;
      } catch (apiError) {
        // Jika API error tapi token ada, coba ambil user dari localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          return { user, token };
        }
        return rejectWithValue(apiError.response?.data?.message || 'Authentication check failed');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Authentication check failed');
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    // Reducer untuk set auth dari localStorage (bisa dipakai untuk init)
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.status = 'succeeded';
      state.error = null;
    },
    // Tambahkan reducer untuk init auth dari localStorage
    initAuth: (state) => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          state.user = user;
          state.isAuthenticated = true;
          state.status = 'succeeded';
        } catch (error) {
          // Jika parsing gagal, reset state
          state.user = null;
          state.isAuthenticated = false;
          state.status = 'idle';
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = {
          ...action.payload.user,
          isAdmin: action.payload.user.is_admin,
        };
        state.isAuthenticated = true;

        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })

      // Register
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = {
          ...action.payload.user,
          isAdmin: action.payload.user.is_admin,
        };
        state.isAuthenticated = true;

        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // Pastikan action.payload dan action.payload.user ada
        if (action.payload && action.payload.user) {
          state.user = {
            ...action.payload.user,
            isAdmin: action.payload.user.is_admin || false,
          };
          state.isAuthenticated = true;

          // Update localStorage dengan data terbaru
          localStorage.setItem('token', action.payload.token || localStorage.getItem('token'));
          localStorage.setItem('user', JSON.stringify(state.user));
        } else {
          // Jika user atau data tidak ada, coba ambil dari localStorage
          const storedUser = localStorage.getItem('user');
          const token = localStorage.getItem('token');
          
          if (storedUser && token) {
            try {
              state.user = JSON.parse(storedUser);
              state.isAuthenticated = true;
            } catch (error) {
              // Jika parsing gagal, reset state
              state.user = null;
              state.isAuthenticated = false;
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              console.error('Failed to parse stored user data', error);
            }
          } else {
            // Jika tidak ada data di localStorage, reset state
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            console.warn('User data missing in checkAuth fulfillment payload and localStorage');
          }
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        // Coba ambil dari localStorage jika API check gagal
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
          try {
            state.user = JSON.parse(storedUser);
            state.isAuthenticated = true;
            state.status = 'succeeded';
          } catch (error) {
            // Jika parsing gagal, reset state
            state.user = null;
            state.isAuthenticated = false;
            state.status = 'idle';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } else {
          // Jika tidak ada data di localStorage, reset state
          state.user = null;
          state.isAuthenticated = false;
          state.status = 'idle';
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        
        // Tambahkan error message jika diperlukan
        state.error = action.payload || 'Authentication check failed';
      });
  },
});

export const { resetAuthStatus, setAuth, initAuth } = authSlice.actions;

export default authSlice.reducer;
