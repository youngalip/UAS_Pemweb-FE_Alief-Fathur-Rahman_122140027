// src/components/community/CommentItem.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from "../../utils/formatters";
import { deleteComment } from '../../features/community/communitySlice';

const backendBaseURL = 'http://localhost:6543';
const isFullURL = (url) => /^https?:\/\//i.test(url);

const CommentItem = ({ comment, threadId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  
  if (!comment) return null;

  const {
    id,
    content,
    created_at,
    user: commentUser = {},
  } = comment;

  // Format tanggal
  let formattedDate = 'Recent';
  if (created_at) {
    try {
      formattedDate = formatDate(created_at, 'relative');
    } catch (e) {
      console.error('Error formatting date:', e);
    }
  }

  // Tentukan nama dan avatar author dengan fallback
  let authorName = 'Unknown User';
  let authorAvatar = 'https://source.unsplash.com/random/40x40/?person';

  if (typeof commentUser === 'string') {
    authorName = commentUser;
  } else if (commentUser) {
    authorName = commentUser.full_name || commentUser.name || commentUser.username || 'Unknown User';
    authorAvatar =
      commentUser.avatar_url ||
      commentUser.avatarUrl ||
      commentUser.avatar ||
      commentUser.image ||
      'https://source.unsplash.com/random/40x40/?person';
  }

  if (authorAvatar && !isFullURL(authorAvatar)) {
    authorAvatar = backendBaseURL + authorAvatar;
  }

  const isAuthor = user && commentUser && user.id === commentUser.id;

  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
      try {
        await dispatch(deleteComment({ threadId, commentId: id })).unwrap();
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between">
        <div className="flex items-start">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-8 h-8 rounded-full mr-3"
            onError={(e) => {
              e.target.src = 'https://source.unsplash.com/random/40x40/?person';
            }}
          />
          <div>
            <div className="flex items-center">
              <span className="font-medium text-gray-900 mr-2">{authorName}</span>
              <span className="text-xs text-gray-500">{formattedDate}</span>
            </div>
            <div className="mt-2 text-gray-700">
              {content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        
        {isAuthor && (
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500"
            title="Hapus komentar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
