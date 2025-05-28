import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedArticles = ({ articles = [] }) => {
  if (!articles || articles.length === 0) return null;

  // Get the main featured article and the rest
  const mainArticle = articles[0](citation_0);
  const secondaryArticles = articles.slice(1, 5);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Artikel Pilihan</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Featured Article */}
          {mainArticle && (
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <Link to={`/articles/${mainArticle.id}`}>
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={mainArticle.imageUrl} 
                    alt={mainArticle.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-semibold rounded-md mb-3">
                    {mainArticle.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{mainArticle.title}</h3>
                  <p className="text-gray-200 mb-4 line-clamp-2">{mainArticle.excerpt}</p>
                  <div className="flex items-center">
                    <img
                      src={mainArticle.author.avatarUrl || 'https://via.placeholder.com/40'}
                      alt={mainArticle.author.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">{mainArticle.author.name}</p>
                      <p className="text-gray-300 text-xs">{mainArticle.publishedDate}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Secondary Featured Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {secondaryArticles.map(article => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <Link to={`/articles/${article.id}`}>
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-gray-100 text-primary px-2 py-1 text-xs font-semibold rounded-md mb-2">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={article.author.avatarUrl || 'https://via.placeholder.com/32'}
                          alt={article.author.name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-xs text-gray-700">{article.author.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{article.publishedDate}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;