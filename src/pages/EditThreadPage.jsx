// src/pages/EditThreadPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreadById, updateThread } from '../features/community/communitySlice';
import ThreadForm from '../components/community/ThreadForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const EditThreadPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentThread, status, error } = useSelector((state) => state.community);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchThreadById(id));
  }, [dispatch, id]);

  const handleSubmit = async (threadData) => {
    return dispatch(updateThread({ id, threadData })).unwrap();
  };

  // Redirect if not the author
  useEffect(() => {
    if (currentThread && user && currentThread.user && currentThread.user.id !== user.id) {
      navigate(`/community/thread/${id}`);
    }
  }, [currentThread, user, id, navigate]);

  if (status === 'loading' && !currentThread) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Diskusi</h1>
        <ThreadForm 
          initialData={currentThread} 
          onSubmit={handleSubmit} 
          isEditing={true} 
        />
      </div>
    </div>
  );
};

export default EditThreadPage;
