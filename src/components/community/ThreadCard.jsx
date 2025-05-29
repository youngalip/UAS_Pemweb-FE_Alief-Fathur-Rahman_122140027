import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { formatDate } from '../../utils/formatters';

const backendBaseURL = 'http://localhost:6543'; // Ganti sesuai URL backend-mu
const defaultAvatar = '/assets/images/default-avatar.png'; // Path gambar fallback lokal
const isFullURL = (url) => /^https?:\/\//i.test(url);

const ThreadCard = ({ thread }) => {
  if (!thread) return null;

  const {
    id,
    title = 'Untitled Thread',
    content = 'No content available.',
    created_at,
    comment_count = 0,
    user = {},
  } = thread;

  // Format tanggal dengan date-fns
  let formattedDate = 'Recent';
  if (created_at) {
    try {
      formattedDate = formatDistanceToNow(new Date(created_at), { 
        addSuffix: true,
        locale: id 
      });
    } catch (e) {
      console.error('Error formatting date:', e);
    }
  }

  // Tentukan nama dan avatar author dengan fallback ke defaultAvatar
  let authorName = 'Unknown User';
  let authorAvatar = defaultAvatar;

  if (typeof user === 'string') {
    authorName = user;
  } else if (user) {
    authorName = user.full_name || user.name || user.username || 'Unknown User';
    authorAvatar =
      user.avatar_url ||
      user.avatarUrl ||
      user.avatar ||
      user.image ||
      defaultAvatar;
  }

  if (authorAvatar && !isFullURL(authorAvatar)) {
    authorAvatar = backendBaseURL + authorAvatar;
  }

  // Truncate content for preview
  const truncatedContent = content.length > 150 
    ? content.substring(0, 150) + '...' 
    : content;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-10 h-10 rounded-full mr-3"
              onError={(e) => {
                // Jika gagal load gambar, pakai default lokal
                e.target.onerror = null; // mencegah loop
                e.target.src = defaultAvatar;
              }}
            />
            <div>
              <span className="font-medium text-gray-900">{authorName}</span>
              <p className="text-xs text-gray-500">{formatDate(created_at)}</p>
            </div>
          </div>
        </div>
        
        <Link to={`/community/thread/${id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors duration-200">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{truncatedContent}</p>
        
        <div className="flex items-center text-sm text-gray-500">
          <Link 
            to={`/community/thread/${id}`}
            className="flex items-center hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {comment_count} {comment_count === 1 ? 'komentar' : 'komentar'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
