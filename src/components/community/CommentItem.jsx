// CommentItem.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../features/community/communitySlice';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

const CommentItem = ({ comment, threadId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: id
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteComment({ threadId, commentId: comment.id })).unwrap();
        setIsDeleted(true);
      } catch (error) {
        console.error('Failed to delete comment:', error);
        alert('Failed to delete comment');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  if (isDeleted) {
    return (
      <div className="p-4 bg-gray-100 rounded italic text-gray-500">
        This comment has been deleted.
      </div>
    );
  }
  
  const isOwner = user && comment.user_id === user.id;
  const isAdmin = user && user.isAdmin;
  
  return (
    <div className="border-b pb-4">
      <div className="flex items-start">
        <img 
          src={comment.user?.avatar_url || '/assets/images/default-avatar.png'} 
          alt={comment.user?.username || 'User'} 
          className="w-10 h-10 rounded-full mr-3 mt-1"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <div>
              <span className="font-medium">{comment.user?.username || 'Anonymous'}</span>
              <span className="text-gray-500 text-sm ml-2">{formatDate(comment.created_at)}</span>
            </div>
            {(isOwner || isAdmin) && (
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
          <div className="text-gray-800">
            {comment.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
