// src/components/community/ThreadForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThreadForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Judul diperlukan';
    if (!content.trim()) newErrors.content = 'Konten diperlukan';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({ title, content });
      navigate(isEditing ? `/community/thread/${initialData.id}` : '/community');
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Judul
        </label>
        <input
          type="text"
          id="title"
          className={`w-full px-3 py-2 border ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
          placeholder="Judul diskusi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Konten
        </label>
        <textarea
          id="content"
          rows="8"
          className={`w-full px-3 py-2 border ${
            errors.content ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary`}
          placeholder="Tulis diskusi Anda di sini..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate('/community')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'
          }`}
        >
          {isSubmitting 
            ? 'Menyimpan...' 
            : isEditing 
              ? 'Perbarui Diskusi' 
              : 'Buat Diskusi'
          }
        </button>
      </div>
    </form>
  );
};

export default ThreadForm;
