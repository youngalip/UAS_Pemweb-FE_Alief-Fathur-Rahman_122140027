// CommentSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const CommentSection = ({ threadId, comments, isAuthenticated }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>
      
      {isAuthenticated ? (
        <CommentForm threadId={threadId} />
      ) : (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <p className="text-gray-700">
            Please <Link to="/login" className="text-blue-600 hover:underline">login</Link> to add a comment.
          </p>
        </div>
      )}
      
      <div className="space-y-6 mt-6">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} threadId={threadId} />
          ))
        ) : (
          <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
