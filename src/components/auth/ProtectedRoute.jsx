import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, status } = useSelector(state => state.auth);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Tidak cek admin, semua user login boleh akses
  return children;
};

export default ProtectedRoute;
