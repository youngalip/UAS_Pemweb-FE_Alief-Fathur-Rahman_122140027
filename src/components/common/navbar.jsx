import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import logo from '../../assets/images/hoopsnewsid-logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');  // Redirect ke halaman login setelah logout
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-10 w-auto" src={logo} alt="HoopsnewsID" />
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="text-gray-900 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary text-sm font-medium">
                Home
              </Link>
              <Link to="/articles" className="text-gray-900 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary text-sm font-medium">
                Artikel
              </Link>
              <Link to="/ibl" className="text-gray-900 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary text-sm font-medium">
                IBL
              </Link>
              <Link to="/nba" className="text-gray-900 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary text-sm font-medium">
                NBA
              </Link>
              <Link to="/community" className="text-gray-900 hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-primary text-sm font-medium">
                Komunitas
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-900 hover:text-primary text-sm font-medium">
                  Profil
                </Link>
                {user?.isAdmin && (
                  <Link to="/admin" className="text-gray-900 hover:text-primary text-sm font-medium">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-900 hover:text-primary text-sm font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="text-gray-900 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-primary text-base font-medium">
              Home
            </Link>
            <Link to="/articles" className="text-gray-900 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-primary text-base font-medium">
              Artikel
            </Link>
            <Link to="/ibl" className="text-gray-900 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-primary text-base font-medium">
              IBL
            </Link>
            <Link to="/nba" className="text-gray-900 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-primary text-base font-medium">
              NBA
            </Link>
            <Link to="/community" className="text-gray-900 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-primary text-base font-medium">
              Komunitas
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-1">
                <Link to="/profile" className="text-gray-900 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-primary text-base font-medium">
                  Profil
                </Link>
                {user?.isAdmin && (
                  <Link to="/admin" className="text-gray-900 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-primary text-base font-medium">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-900 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-primary text-base font-medium w-full text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link to="/login" className="text-gray-900 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-primary text-base font-medium">
                  Login
                </Link>
                <Link to="/register" className="text-gray-900 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-primary text-base font-medium">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
