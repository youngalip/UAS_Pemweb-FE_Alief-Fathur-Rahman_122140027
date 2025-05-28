import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRelatedArticles } from '../../features/articles/articlesSlice';
import ArticleCard from './ArticleCard';
import LoadingSpinner from '../common/LoadingSpinner';

const RelatedArticles = ({ categoryId, currentArticleId, tags }) => {
  const dispatch = useDispatch();
  const { relatedArticles, status } = useSelector(state => state.articles);
  const [displayCount, setDisplayCount] = useState(3);

  useEffect(() => {
    if (categoryId && currentArticleId) {
      dispatch(fetchRelatedArticles({ categoryId, articleId: currentArticleId, tags }));
    }
  }, [dispatch, categoryId, currentArticleId, tags]);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (!relatedArticles || relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Artikel Terkait</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedArticles.slice(0, displayCount).map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        
        {displayCount < relatedArticles.length && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-md"
            >
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedArticles;
