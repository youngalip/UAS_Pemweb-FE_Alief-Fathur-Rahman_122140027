import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createThread } from '../features/community/communitySlice';
import ThreadForm from '../components/community/ThreadForm';
import { Navigate } from 'react-router-dom';

const CreateThreadPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector(state => state.auth);

  // Jika sedang loading status auth, bisa tampil loading atau kosongkan dulu
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Jika tidak authenticated, redirect ke login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (threadData) => {
    return dispatch(createThread(threadData)).unwrap();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Buat Diskusi Baru</h1>
        <ThreadForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateThreadPage;
