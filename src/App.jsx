import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initAuth,checkAuth } from './features/auth/authSlice';

// Layout
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Community Pages
import CommunityPage from './pages/CommunityPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import CreateThreadPage from './pages/CreateThreadPage';
import EditThreadPage from './pages/EditThreadPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageArticles from './pages/admin/ManageArticles';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCategories from './pages/admin/ManageCategories';
import ManageComments from './pages/admin/ManageComments';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

// Protected Routes
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          
          {/* Artikel bisa diakses semua user tanpa proteksi */}
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:id" element={<ArticleDetailPage />} />
          
          <Route path="profile/:username" element={<ProfilePage />} />
          <Route path="profile" element={<ProfilePage />} />
          
          {/* Community Routes - buat dan edit diskusi butuh login */}
          <Route path="community" element={<CommunityPage />} />
          <Route path="community/thread/:id" element={<ThreadDetailPage />} />
          <Route 
            path="community/create" 
            element={
              <ProtectedRoute>
                <CreateThreadPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="community/edit/:id" 
            element={
              <ProtectedRoute>
                <EditThreadPage />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="articles" element={<ManageArticles />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="comments" element={<ManageComments />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          
          {/* Jika ada fitur admin komunitas, tambahkan di sini */}
          {/* <Route path="community" element={<ManageCommunity />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
