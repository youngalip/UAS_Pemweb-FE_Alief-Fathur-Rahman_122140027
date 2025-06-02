import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createArticle } from '../../features/admin/adminSlice';
import ArticleForm from '../../components/articles/ArticleForm';

const CreateArticlePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (articleData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await dispatch(createArticle(articleData)).unwrap();
      // Redirect ke halaman detail artikel atau daftar artikel setelah sukses
      navigate(`/articles/${result.id}`);
    } catch (error) {
      setSubmitError(error || 'Failed to create article');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Buat Artikel Baru</h1>
      {submitError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {submitError}
        </div>
      )}
      <ArticleForm 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default CreateArticlePage;
