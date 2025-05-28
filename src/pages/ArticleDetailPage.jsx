// src/pages/ArticleDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArticleById } from '../features/articles/articlesSlice';
import CommentSection from '../components/articles/CommentSection';
import RelatedArticles from '../components/articles/RelatedArticles';
import ShareButtons from '../components/common/ShareButtons';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentArticle, status, error } = useSelector(state => state.articles);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
    }
  }, [id, dispatch]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <div className="text-center py-12 text-red-600">Error: {error}</div>;
  }

  if (!currentArticle) {
    return <div className="text-center py-12">Artikel tidak ditemukan</div>;
  }

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={currentArticle.imageUrl}
          alt={currentArticle.title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          {/* Category and Date */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <span className="bg-primary text-white px-3 py-1 text-sm font-semibold rounded-md">
              {currentArticle.category}
            </span>
            <span className="text-gray-500 text-sm">
              {currentArticle.publishedDate}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {currentArticle.title}
          </h1>

          {/* Author */}
          <div className="flex items-center mb-8 border-b border-gray-200 pb-6">
            <img
              src={currentArticle.author.avatarUrl}
              alt={currentArticle.author.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-medium text-gray-900">{currentArticle.author.name}</p>
              <p className="text-sm text-gray-500">{currentArticle.author.role}</p>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: currentArticle.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {currentArticle.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 text-gray-800 px-3 py-1 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share Buttons */}
          <ShareButtons url={window.location.href} title={currentArticle.title} />

          {/* Comment Section */}
          <CommentSection articleId={id} comments={currentArticle.comments} />
        </div>
      </div>

      {/* Related Articles */}
      <RelatedArticles 
        categoryId={currentArticle.categoryId} 
        currentArticleId={currentArticle.id}
      />
    </div>
  );
};

export default ArticleDetailPage;
