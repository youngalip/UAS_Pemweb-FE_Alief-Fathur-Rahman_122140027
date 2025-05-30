import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminSidebar = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex-shrink-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>

      <div className="px-4 py-2">
        <div className="flex items-center space-x-3 mb-6 px-2">
          <img
            src={user?.avatarUrl || 'https://via.placeholder.com/40'}
            alt={user?.name || 'User Avatar'}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>

        <nav className="space-y-1">
          {/* Tombol Kembali ke Homepage */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7m-9 12v-8h4v8m5-2v-6a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v6"
              />
            </svg>
            Beranda
          </NavLink>

          {/* Menu Dashboard */}
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "bg-gray-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </NavLink>

          {/* Menu Artikel */}
          <NavLink
            to="/admin/articles"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            Artikel
          </NavLink>

          {/* Menu Pengguna */}
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Pengguna
          </NavLink>

          {/* Menu Kategori */}
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            Kategori
          </NavLink>

          {/* Menu Komentar */}
          <NavLink
            to="/admin/comments"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            Komentar
          </NavLink>

          {/* Menu Analitik */}
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Analitik
          </NavLink>

          {/* Menu Pengaturan */}
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                : "text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Pengaturan
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
