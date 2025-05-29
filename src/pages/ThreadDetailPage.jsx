// src/pages/ThreadDetailPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreadById, deleteThread, clearCurrentThread } from '../features/community/communitySlice';
import ThreadDetail from '../components/community/ThreadDetail';
import CommentSection from '../components/community/CommentSection';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ThreadDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentThread, status, error } = useSelector((state) => state.community);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchThreadById(id));
    
    return () => {
      dispatch(clearCurrentThread());
    };
  }, [dispatch, id]);

  const handleDeleteThread = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus diskusi ini?')) {
      try {
        await dispatch(deleteThread(id)).unwrap();
        navigate('/community');
      } catch (error) {
        console.error('Failed to delete thread:', error);
      }
    }
  };

  const isAuthor = currentThread && user && currentThread.user && currentThread.user.id === user.id;

  if (status === 'loading' && !currentThread) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-8 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => navigate('/community')}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Kembali ke Forum
          </button>
        </div>
      </div>
    );
  }

  if (!currentThread) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-500 mb-4">Diskusi tidak ditemukan</p>
        <button 
          onClick={() => navigate('/community')}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Kembali ke Forum
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/community')}
            className="text-primary hover:text-primary-dark flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Forum
          </button>
        </div>
        
        <ThreadDetail 
          thread={currentThread} 
          onDelete={handleDeleteThread} 
          isAuthor={isAuthor} 
        />
        
        <CommentSection 
          threadId={id} 
          comments={currentThread.comments || []} 
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
};

export default ThreadDetailPage;
