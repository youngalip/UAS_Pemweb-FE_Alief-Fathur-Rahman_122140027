import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreadById, updateThread } from '../features/community/communitySlice';
import ThreadForm from '../components/community/ThreadForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const EditThreadPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentThread, status, error } = useSelector(state => state.community);
  const { user } = useSelector(state => state.auth);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchThreadById(id));
    }
  }, [dispatch, id]);
  
  const handleSubmit = async (threadData) => {
    try {
      await dispatch(updateThread({ threadId: id, threadData })).unwrap();
      setUpdateSuccess(true);
      // Redirect setelah 1.5 detik
      setTimeout(() => {
        navigate(`/community/thread/${id}`);
      }, 1500);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };
  
  if (status === 'loading' && !currentThread) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (!currentThread) {
    return <ErrorMessage message="Thread not found" />;
  }
  
  // Cek apakah user adalah pemilik thread atau admin
  const isOwner = user && currentThread && (
    String(currentThread.user_id) === String(user.id)
  );
  const isAdmin = user && user.isAdmin === true;
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Thread</h1>
      
      {updateSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Thread updated successfully! Redirecting...
        </div>
      )}
      
      <ThreadForm 
        initialValues={{
          id: currentThread.id,
          title: currentThread.title,
          content: currentThread.content,
          tags: currentThread.tags?.map(tag => {
            if (typeof tag === 'string') return tag;
            if (tag.name) return tag.name;
            // Handle case where tag is an object with toString method
            const tagString = tag.toString();
            const match = tagString.match(/name='([^']+)'/);
            return match ? match[1] : tagString;
          }) || []
        }}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
};

export default EditThreadPage;
