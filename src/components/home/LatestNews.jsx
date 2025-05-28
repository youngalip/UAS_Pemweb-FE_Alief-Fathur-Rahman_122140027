// src/components/home/LatestNews.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../articles/ArticleCard';

const LatestNews = ({ articles }) => {
  // Pastikan articles adalah array
  const validArticles = Array.isArray(articles) ? articles : [];

  // Jika tidak ada artikel valid, tampilkan pesan atau placeholder
  if (validArticles.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Berita Terbaru</h2>
            <Link 
              to="/articles" 
              className="text-primary hover:text-primary-dark font-medium flex items-center"
            >
              Lihat Semua
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="text-center py-10">
            <p className="text-gray-500">Belum ada berita terbaru.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Berita Terbaru</h2>
          <Link 
            to="/articles" 
            className="text-primary hover:text-primary-dark font-medium flex items-center"
          >
            Lihat Semua
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {validArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
