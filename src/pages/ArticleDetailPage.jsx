// src/pages/ArticleDetailPage.jsx
import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticleById } from '../features/articles/articlesSlice';
import CommentSection from '../components/articles/CommentSection';
// import RelatedArticles from '../components/articles/RelatedArticles'; // tetap komentar
import ShareButtons from '../components/common/ShareButtons';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

// Sesuaikan base URL backend Anda
const backendBaseURL = 'http://localhost:6543';
const defaultArticleImage = '/assets/images/default-article.jpg';
const defaultAvatar = '/assets/images/default-avatar.png';

// Fungsi untuk cek apakah URL sudah absolute
const isFullURL = (url) => /^https?:\/\//i.test(url);

// Fungsi untuk mendapatkan URL gambar yang benar
const getImageSrc = (url, fallback) => {
  if (!url) return fallback;
  return isFullURL(url) ? url : backendBaseURL + url;
};

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentArticle, status, error } = useSelector(state => state.articles);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (id) {
      console.log('Fetching article with ID:', id);
      dispatch(fetchArticleById(id));
    }
    // Optional cleanup jika ada action clearCurrentArticle
    // return () => dispatch(clearCurrentArticle());
  }, [id, dispatch, retryCount]);

  // Fungsi untuk mengekstrak nama kategori dengan aman
  const getCategoryName = (category) => {
    if (!category) return '';
    if (typeof category === 'string') return category;
    if (category.name) return category.name;
    return JSON.stringify(category);
  };

  // Fungsi untuk mengekstrak nama tag dengan aman
  const getTagName = (tag) => {
    if (!tag) return '';
    if (typeof tag === 'string') return tag;
    if (tag.name) return tag.name;
    return JSON.stringify(tag);
  };

  // Fungsi retry
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ErrorMessage message={error || 'Failed to load article'} />
        <div className="flex gap-4 mt-4">
          <button 
            onClick={handleRetry}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
          <button 
            onClick={() => navigate('/articles')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  if (!currentArticle) {
    return (
      <div className="text-center py-12">
        <ErrorMessage message="Article not found" />
        <button 
          onClick={() => navigate('/articles')}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Back to Articles
        </button>
      </div>
    );
  }

  const articleContent = currentArticle.content || '<p>No content available</p>';

  return (
    <div className="bg-white ">
      {/* Hero Image */}
      <div className="relative h-96 bg-gray-900 ">
        <img
          src={getImageSrc(currentArticle.image_url || currentArticle.imageUrl, defaultArticleImage)}
          alt={currentArticle.title}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            e.target.src = defaultArticleImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          {/* Category and Date */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <span className="bg-primary text-white px-3 py-1 text-sm font-semibold rounded-md">
              {currentArticle.category ? getCategoryName(currentArticle.category) : 'Uncategorized'}
            </span>
            <span className="text-gray-500 text-sm">
              {currentArticle.published_at || currentArticle.publishedDate || new Date(currentArticle.created_at).toLocaleDateString()}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {currentArticle.title}
          </h1>

          {/* Author */}
          <div className="flex items-center mb-8 border-b border-gray-200 pb-6">
            <img
              src={getImageSrc(
                currentArticle.author?.avatar_url || currentArticle.author?.avatarUrl,
                defaultAvatar
              )}
              alt={currentArticle.author?.name || currentArticle.author?.username || 'Author'}
              className="w-12 h-12 rounded-full mr-4"
              onError={(e) => {
                e.target.src = defaultAvatar;
              }}
            />
            <div>
              <p className="font-medium text-gray-900">
                {currentArticle.author?.name || currentArticle.author?.username || currentArticle.author?.full_name || 'Anonymous'}
              </p>
              <p className="text-sm text-gray-500">
                {currentArticle.author?.role || (currentArticle.author?.is_admin ? 'Admin' : 'Contributor')}
              </p>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: articleContent }}
          />

          {/* Tags */}
          {currentArticle.tags && currentArticle.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {currentArticle.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 px-3 py-1 text-sm rounded-full"
                >
                  #{typeof tag === 'string' ? tag : (tag.name || getTagName(tag))}
                </span>
              ))}
            </div>
          )}

          {/* Share Buttons */}
          <ShareButtons url={window.location.href} title={currentArticle.title} />

          {/* Comment Section */}
          {currentArticle.comments && (
            <CommentSection articleId={id} comments={currentArticle.comments} />
          )}
        </div>
      </div>

      {/* Related Articles */}
      {/*
      {currentArticle.category_id && (
        <RelatedArticles 
          categoryId={currentArticle.category_id || currentArticle.categoryId} 
          currentArticleId={currentArticle.id}
          tags={currentArticle.tags?.map(tag => typeof tag === 'string' ? tag : getTagName(tag))}
        />
      )}
      */}
    </div>
  );
};

export default ArticleDetailPage;
