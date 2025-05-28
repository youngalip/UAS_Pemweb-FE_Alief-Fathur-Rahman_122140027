import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserArticles } from '../../features/articles/articlesSlice';
import ArticleCard from '../articles/ArticleCard';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/button';

const UserArticles = ({ userId, isOwnProfile }) => {
  const dispatch = useDispatch();
  const { userArticles, status, error } = useSelector(state => state.articles);
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserArticles(userId));
    }
  }, [dispatch, userId]);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md">
        {error}
      </div>
    );
  }

  if (!userArticles || userArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl font-medium text-gray-500 mb-4">Belum ada artikel</p>
        {isOwnProfile && (
          <Button
            to="/community/write"
            variant="primary"
          >
            Tulis Artikel Pertama Anda
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {userArticles.slice(0, displayCount).map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      
      {displayCount < userArticles.length && (
        <div className="text-center mt-8">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="border-primary text-primary hover:bg-primary-light hover:text-white"
          >
            Muat Lebih Banyak
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserArticles;
