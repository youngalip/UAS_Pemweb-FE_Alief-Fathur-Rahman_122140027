// src/components/community/ThreadDetail.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatters';

const backendBaseURL = 'http://localhost:6543';
const isFullURL = (url) => /^https?:\/\//i.test(url);

const ThreadDetail = ({ thread, onDelete, isAuthor }) => {
  if (!thread) return null;

  const {
    id,
    title,
    content,
    created_at,
    updated_at,
    user = {},
  } = thread;

  // Format tanggal
  const formattedDate = formatDate(created_at);
  const wasEdited = created_at !== updated_at;

  // Tentukan nama dan avatar author dengan fallback
  let authorName = 'Unknown User';
  let authorAvatar = 'https://source.unsplash.com/random/40x40/?person';

  if (typeof user === 'string') {
    authorName = user;
  } else if (user) {
    authorName = user.full_name || user.name || user.username || 'Unknown User';
    authorAvatar =
      user.avatar_url ||
      user.avatarUrl ||
      user.avatar ||
      user.image ||
      'https://source.unsplash.com/random/40x40/?person';
  }

  if (authorAvatar && !isFullURL(authorAvatar)) {
    authorAvatar = backendBaseURL + authorAvatar;
  }

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-10 h-10 rounded-full mr-3"
              onError={(e) => {
                e.target.src = 'https://source.unsplash.com/random/40x40/?person';
              }}
            />
            <div>
              <span className="font-medium text-gray-900">{authorName}</span>
              <p className="text-xs text-gray-500">
                {formattedDate}
                {wasEdited && <span className="ml-2">(telah diedit)</span>}
              </p>
            </div>
          </div>
          
          {isAuthor && (
            <div className="flex space-x-2">
              <Link
                to={`/community/edit/${id}`}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Link>
              <button
                onClick={onDelete}
                className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus
              </button>
            </div>
          )}
        </div>
        
        <div className="prose max-w-none">
          {content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ThreadDetail;
