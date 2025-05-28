import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../features/users/usersSlice';
import { fetchUserArticles } from '../features/articles/articlesSlice';
import ArticleCard from '../components/articles/ArticleCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { currentProfile, status: userStatus } = useSelector(state => state.users);
  const { userArticles, status: articlesStatus } = useSelector(state => state.articles);
  const { user: currentUser } = useSelector(state => state.auth);
  
  const isOwnProfile = currentUser && (username === currentUser.username || !username);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserProfile(username));
    } else if (currentUser) {
      dispatch(fetchUserProfile(currentUser.username));
    }
  }, [username, currentUser, dispatch]);

  useEffect(() => {
    if (currentProfile) {
      dispatch(fetchUserArticles(currentProfile.id));
    }
  }, [currentProfile, dispatch]);

  if (userStatus === 'loading') {
    return <LoadingSpinner />;
  }

  if (userStatus === 'failed' || !currentProfile) {
    return <div className="text-center py-12 text-red-600">Profil tidak ditemukan</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={currentProfile.avatarUrl || 'https://via.placeholder.com/150'}
              alt={currentProfile.name}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white">{currentProfile.name}</h1>
              <p className="text-primary-light">@{currentProfile.username}</p>
              <p className="text-white mt-2">{currentProfile.bio}</p>
              <div className="flex items-center justify-center md:justify-start mt-4 space-x-4">
                <div className="text-white">
                  <span className="font-bold">{userArticles.length}</span> Artikel
                </div>
                <div className="text-white">
                  <span className="font-bold">{currentProfile.followers}</span> Pengikut
                </div>
                <div className="text-white">
                  <span className="font-bold">{currentProfile.following}</span> Mengikuti
                </div>
              </div>
            </div>
            {isOwnProfile ? (
              <div className="md:ml-auto">
                <button className="bg-white text-primary hover:bg-gray-100 font-medium py-2 px-4 rounded-md">
                  Edit Profil
                </button>
              </div>
            ) : (
              <div className="md:ml-auto">
                <button className="bg-white text-primary hover:bg-gray-100 font-medium py-2 px-4 rounded-md">
                  Ikuti
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button className="border-primary text-primary font-medium py-4 px-1 border-b-2">
              Artikel
            </button>
            <button className="text-gray-500 hover:text-gray-700 font-medium py-4 px-1 border-b-2 border-transparent hover:border-gray-300">
              Komentar
            </button>
            <button className="text-gray-500 hover:text-gray-700 font-medium py-4 px-1 border-b-2 border-transparent hover:border-gray-300">
              Disukai
            </button>
          </nav>
        </div>

        {articlesStatus === 'loading' ? (
          <LoadingSpinner />
        ) : userArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl font-medium mb-4">Belum ada artikel</p>
            {isOwnProfile && (
              <button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md">
                Tulis Artikel Pertama Anda
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
