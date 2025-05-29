import React from 'react';
import { Link } from 'react-router-dom';

const backendBaseURL = 'http://localhost:6543'; // Ganti sesuai backend

const getImageSrc = (image_url) => {
  if (!image_url) return '/path/to/default-image.jpg';
  if (/^https?:\/\//i.test(image_url)) return image_url;
  return backendBaseURL + image_url;
};

const HeroSection = ({ featuredArticle }) => {
  if (!featuredArticle) {
    return (
      <div className="relative bg-gray-900 h-96 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Selamat Datang di HoopsnewsID</h1>
          <p className="text-xl">Portal Berita Basket Indonesia</p>
        </div>
      </div>
    );
  }

  const author = featuredArticle.author || {};

  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={getImageSrc(featuredArticle.image_url)}
          alt={featuredArticle.title || 'Featured Article'}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-semibold rounded-md mb-4">
            {typeof featuredArticle.category === 'string'
              ? featuredArticle.category
              : featuredArticle.category?.name || 'Artikel'}
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-4">
            {featuredArticle.title}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {featuredArticle.excerpt}
          </p>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={getImageSrc(author.avatar_url)}
              alt={author.full_name || author.username || 'Author'}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-white font-medium">{author.full_name || author.username || 'Unknown Author'}</p>
              <p className="text-gray-400 text-sm">
                {featuredArticle.published_at
                  ? new Date(featuredArticle.published_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Baru saja'}
              </p>
            </div>
          </div>
          <Link
            to={`/articles/${featuredArticle.id || '1'}`}
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-md transition duration-300"
          >
            Baca Selengkapnya
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
