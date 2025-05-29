import React from 'react';
import { Link } from 'react-router-dom';

const backendBaseURL = 'http://localhost:6543'; // Ganti dengan URL backend kamu

const isFullURL = (url) => /^https?:\/\//i.test(url);

const getImageSrc = (image_url) => {
  if (!image_url) return 'https://source.unsplash.com/random/400x300/?basketball';
  return isFullURL(image_url) ? image_url : backendBaseURL + image_url;
};

const PopularArticles = ({ articles }) => {
  const validArticles = Array.isArray(articles) ? articles : [];

  if (validArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Artikel Populer</h2>
          <Link 
            to="/articles/popular" 
            className="text-primary hover:text-primary-dark font-medium flex items-center"
          >
            Lihat Semua
            <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {validArticles.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden group">
              <Link to={`/articles/${validArticles[0].id || '#'}`}>
                <div className="relative">
                  <img 
                    src={getImageSrc(validArticles[0].image_url)} 
                    alt={validArticles[0].title || 'Popular Article'} 
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 text-sm font-semibold rounded-md">
                    {typeof validArticles[0].category === 'string'
                      ? validArticles[0].category
                      : validArticles[0].category?.name || 'Featured'}
                  </div>
                  <div className="absolute top-3 right-3 bg-gray-900 bg-opacity-70 text-white px-3 py-1 text-sm font-semibold rounded-md flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    {validArticles[0].views || '0'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-200">
                    {validArticles[0].title || 'Untitled Article'}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{validArticles[0].excerpt || 'No excerpt available.'}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={getImageSrc(validArticles[0].author?.avatar_url)}
                        alt={validArticles[0].author?.full_name || validArticles[0].author?.username || 'Author'}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {validArticles[0].author?.full_name || validArticles[0].author?.username || 'Unknown Author'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {validArticles[0].published_at
                            ? new Date(validArticles[0].published_at).toLocaleDateString('id-ID')
                            : 'Recent'}
                        </p>
                      </div>
                    </div>
                    <span className="text-primary font-medium text-sm">Baca Selengkapnya</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="space-y-4">
            {validArticles.slice(1, 5).map(article => (
              <Link 
                key={article.id || Math.random()} 
                to={`/articles/${article.id || '#'}`}
                className="flex bg-white rounded-lg shadow-md overflow-hidden group h-32"
              >
                <div className="w-1/3 relative">
                  <img 
                    src={getImageSrc(article.image_url)} 
                    alt={article.title || 'Article'} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-primary text-white px-2 py-0.5 text-xs font-semibold rounded">
                    {typeof article.category === 'string'
                      ? article.category
                      : article.category?.name || 'Uncategorized'}
                  </div>
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                      {article.title || 'Untitled Article'}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1">{article.excerpt || 'No excerpt available.'}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{article.published_at ? new Date(article.published_at).toLocaleDateString('id-ID') : 'Recent'}</span>
                    <div className="flex items-center text-xs text-gray-500">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      {article.views || '0'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularArticles;
