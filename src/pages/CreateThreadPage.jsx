import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createThread } from '../features/community/communitySlice';
import ThreadForm from '../components/community/ThreadForm';

const CreateThreadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createSuccess, setCreateSuccess] = useState(false);
  
  const handleSubmit = async (threadData) => {
    try {
      const result = await dispatch(createThread(threadData)).unwrap();
      setCreateSuccess(true);
      
      // Redirect setelah 1.5 detik
      setTimeout(() => {
        navigate('/community');
      }, 1500);
    } catch (error) {
      console.error('Failed to create thread:', error);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Thread</h1>
      
      {createSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Thread created successfully! Redirecting...
        </div>
      )}
      
      <ThreadForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateThreadPage;
