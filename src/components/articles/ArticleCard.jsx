// src/components/articles/ArticleCard.jsx (Perbaikan)
import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  // Pastikan article ada
  if (!article) return null;

  // Ekstrak data dengan fallback untuk berbagai format data
  const {
    id,
    title = 'Untitled Article',
    excerpt = 'No excerpt available.',
    // Cek berbagai kemungkinan nama properti untuk gambar
    imageUrl,
    image_url,
    image,
    // Cek berbagai kemungkinan nama properti untuk tanggal
    publishedDate,
    published_at,
    created_at,
    date,
    // Cek berbagai kemungkinan format kategori
    category,
    // Cek berbagai kemungkinan format author
    author = {}
  } = article;

  // Tentukan nilai yang akan digunakan dengan fallback
  const imageSource = imageUrl || image_url || image || 'https://source.unsplash.com/random/400x300/?basketball';
  const articleDate = publishedDate || published_at || created_at || date || 'Recent';
  
  // Handle kategori yang bisa berupa string atau objek
  let categoryName = 'Uncategorized';
  if (typeof category === 'string') {
    categoryName = category;
  } else if (category && category.name) {
    categoryName = category.name;
  }

  // Handle author yang bisa dalam berbagai format
  let authorName = 'Unknown Author';
  let authorAvatar = 'https://source.unsplash.com/random/40x40/?person';
  
  if (typeof author === 'string') {
    authorName = author;
  } else if (author) {
    authorName = author.name || author.username || author.fullName || 'Unknown Author';
    authorAvatar = author.avatarUrl || author.avatar_url || author.avatar || author.image || 'https://source.unsplash.com/random/40x40/?person';
  }

  // Format tanggal jika tersedia
  let formattedDate = articleDate;
  if (articleDate && articleDate !== 'Recent') {
    try {
      formattedDate = new Date(articleDate).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      formattedDate = articleDate;
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/articles/${id || '#'}`}>
        <img
          src={imageSource}
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://source.unsplash.com/random/400x300/?basketball';
          }}
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-primary">
            {categoryName}
          </span>
          <span className="text-xs text-gray-500">
            {formattedDate}
          </span>
        </div>
        <Link to={`/articles/${id || '#'}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary transition-colors duration-200">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-8 h-8 rounded-full mr-2"
            onError={(e) => {
              e.target.src = 'https://source.unsplash.com/random/40x40/?person';
            }}
          />
          <span className="text-xs text-gray-700">{authorName}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
