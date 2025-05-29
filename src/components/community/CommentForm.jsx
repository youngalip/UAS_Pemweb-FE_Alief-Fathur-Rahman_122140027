// src/components/community/CommentForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../features/community/communitySlice';

const CommentForm = ({ threadId }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await dispatch(addComment({ 
        threadId, 
        commentData: { content } 
      })).unwrap();
      // src/components/community/CommentForm.jsx (lanjutan)
      setContent('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Tambahkan Komentar
        </label>
        <textarea
          id="comment"
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="Tulis komentar Anda di sini..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !content.trim()}
        className={`px-4 py-2 rounded-md text-white font-medium ${
          isSubmitting || !content.trim()
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark'
        }`}
      >
        {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
      </button>
    </form>
  );
};

export default CommentForm;

      
