// src/components/community/CommentSection.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const CommentSection = ({ threadId, comments = [], isAuthenticated }) => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Komentar ({comments.length})</h2>
      
      {isAuthenticated ? (
        <CommentForm threadId={threadId} />
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
          <p className="text-gray-600">
            Silakan <a href="/login" className="text-primary font-medium">login</a> untuk menambahkan komentar.
          </p>
        </div>
      )}
      
      <div className="space-y-6 mt-8">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} threadId={threadId} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
