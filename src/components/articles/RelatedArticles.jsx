import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRelatedArticles } from '../../features/articles/articlesSlice';

const backendBaseURL = 'http://localhost:6543'; // Ganti sesuai URL backend-mu
const defaultArticleImage = '/assets/images/default-article.jpg';
const defaultAvatar = '/assets/images/default-avatar.png';

const isFullURL = (url) => /^https?:\/\//i.test(url);

const getImageSrc = (url, fallback) => {
  if (!url) return fallback;
  return isFullURL(url) ? url : backendBaseURL + url;
};

const RelatedArticles = ({ categoryId, currentArticleId, tags = [] }) => {
  const dispatch = useDispatch();
  const { relatedArticles, status } = useSelector(state => state.articles);
  const [error, setError] = useState(null);

  // Gunakan useMemo agar tags tidak berubah referensi tiap render
  const memoizedTags = useMemo(() => tags, [tags]);

  useEffect(() => {
    if (categoryId && currentArticleId) {
      dispatch(fetchRelatedArticles({ categoryId, articleId: currentArticleId, tags: memoizedTags }))
        .unwrap()
        .catch(err => {
          console.error('Failed to fetch related articles:', err);
          setError(err);
        });
    }
  }, [dispatch, categoryId, currentArticleId, memoizedTags]);

  if (error || !relatedArticles || relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map(article => (
            <Link 
              key={article.id} 
              to={`/articles/${article.id}`} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img 
                src={getImageSrc(article.image_url || article.imageUrl, defaultArticleImage)} 
                alt={article.title} 
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.src = defaultArticleImage; }}
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {article.excerpt || (article.content && article.content.substring(0, 100) + '...') || ''}
                </p>
                <div className="flex items-center">
                  <img 
                    src={getImageSrc(article.author?.avatar_url || article.author?.avatarUrl, defaultAvatar)} 
                    alt={article.author?.name || article.author?.username || article.author?.full_name || 'Author'} 
                    className="w-8 h-8 rounded-full mr-2"
                    onError={(e) => { e.target.src = defaultAvatar; }}
                  />
                  <span className="text-sm text-gray-700">
                    {article.author?.name || article.author?.username || article.author?.full_name || 'Anonymous'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;
