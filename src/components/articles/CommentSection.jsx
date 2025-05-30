// src/components/articles/CommentSection.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../features/articles/articlesSlice';

const CommentSection = ({ articleId, comments = [] }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await dispatch(addComment({ 
        articleId, 
        comment: { content } 
      })).unwrap();
      setContent('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-6">Comments ({comments?.length || 0})</h3>
      
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your comment..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            rows="4"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className={`mt-2 px-4 py-2 rounded-md text-white font-medium ${
              isSubmitting || !content.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary-dark'
            }`}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="bg-gray-100 p-4 rounded-md mb-8">
          <p>Please <a href="/login" className="text-primary hover:underline">login</a> to comment</p>
        </div>
      )}
      
      {comments && comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="border-b pb-6">
              <div className="flex items-start">
                <img 
                  src={comment.user?.avatar_url || '/assets/images/default-avatar.png'} 
                  alt={comment.user?.username || 'User'} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium">{comment.user?.username || 'Anonymous'}</h4>
                    <span className="text-gray-500 text-sm ml-2">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-800">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentSection;
