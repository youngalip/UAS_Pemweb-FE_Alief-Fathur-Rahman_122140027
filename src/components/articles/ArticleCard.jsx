import React from 'react';
import { Link } from 'react-router-dom';

const backendBaseURL = 'http://localhost:6543'; // Ganti sesuai URL backend-mu
const defaultAvatar = '/assets/images/default-avatar.png'; // Path gambar avatar default lokal
const isFullURL = (url) => /^https?:\/\//i.test(url);

const ArticleCard = ({ article }) => {
  if (!article) return null;

  const {
    id,
    title = 'Untitled Article',
    excerpt = 'No excerpt available.',
    imageUrl,
    image_url,
    image,
    publishedDate,
    published_at,
    created_at,
    date,
    category,
    author = {},
  } = article;

  // Tentukan image source dengan fallback dan base URL untuk path relatif
  let imgSrc =
    imageUrl ||
    image_url ||
    image ||
    'https://source.unsplash.com/random/400x300/?basketball';

  if (imgSrc && !isFullURL(imgSrc)) {
    imgSrc = backendBaseURL + imgSrc;
  }

  // Tentukan tanggal dengan fallback dan format lokal
  const rawDate = publishedDate || published_at || created_at || date || null;
  let formattedDate = 'Recent';
  if (rawDate) {
    try {
      formattedDate = new Date(rawDate).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      console.error('Error formatting date:', e);
    }
  }

  // Tentukan nama kategori
  let categoryName = 'Uncategorized';
  if (typeof category === 'string') {
    categoryName = category;
  } else if (category && category.name) {
    categoryName = category.name;
  }

  // Tentukan nama dan avatar author dengan fallback ke default lokal
  let authorName = 'Unknown Author';
  let authorAvatar = defaultAvatar;

  if (typeof author === 'string') {
    authorName = author;
  } else if (author) {
    authorName = author.full_name || author.name || author.username || 'Unknown Author';
    authorAvatar =
      author.avatar_url ||
      author.avatarUrl ||
      author.avatar ||
      author.image ||
      defaultAvatar;
  }

  if (authorAvatar && !isFullURL(authorAvatar)) {
    authorAvatar = backendBaseURL + authorAvatar;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/articles/${id || '#'}`}>
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://source.unsplash.com/random/400x300/?basketball';
          }}
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-primary">{categoryName}</span>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
        <Link to={`/articles/${id || '#'}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary transition-colors duration-200">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex items-center">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-8 h-8 rounded-full mr-2"
            onError={(e) => {
              // Jika gagal load avatar, pakai gambar default lokal
              e.target.onerror = null; // mencegah loop
              e.target.src = defaultAvatar;
            }}
          />
          <span className="text-xs text-gray-700">{authorName}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
