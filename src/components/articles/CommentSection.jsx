import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../../features/articles/articlesSlice';

const CommentSection = ({ articleId, comments = [] }) => {
  const [commentText, setCommentText] = useState('');
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    dispatch(addComment({
      articleId,
      comment: {
        text: commentText,
        userId: user.id,
      }
    }));
    
    setCommentText('');
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Komentar ({comments.length})</h3>
      
      {/* Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex items-start space-x-4">
            <img
              src={user.avatarUrl || 'https://via.placeholder.com/40'}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="min-w-0 flex-1">
              <textarea
                id="comment"
                name="comment"
                rows="3"
                className="shadow-sm block w-full focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                placeholder="Tulis komentar Anda..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Kirim Komentar
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 p-4 rounded-md mb-8">
          <p className="text-gray-700">
            Silakan <a href="/login" className="text-primary font-medium">login</a> untuk menambahkan komentar.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={comment.user.avatarUrl || 'https://via.placeholder.com/40'}
                  alt={comment.user.name}
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg px-4 py-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{comment.user.name}</h4>
                  <p className="text-xs text-gray-500">{comment.createdAt}</p>
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  <p>{comment.text}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
