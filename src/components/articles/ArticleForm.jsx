// src/components/articles/ArticleForm.jsx
import React, { useState } from 'react';

const ArticleForm = ({ initialValues = {}, onSubmit, isSubmitting = false }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [excerpt, setExcerpt] = useState(initialValues.excerpt || '');
  const [content, setContent] = useState(initialValues.content || '');
  const [imageUrl, setImageUrl] = useState(initialValues.image_url || '');
  const [status, setStatus] = useState(initialValues.status || 'published');
  const [categoryId, setCategoryId] = useState(initialValues.category_id || '');
  const [tags, setTags] = useState(
    initialValues.tags?.map(tag => (typeof tag === 'string' ? tag : tag.name)) || []
  );
  const [tagInput, setTagInput] = useState('');
  const [formError, setFormError] = useState(null);

  // Tambah tag baru
  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  // Hapus tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // Validasi sederhana
    if (title.trim().length < 3) {
      setFormError('Judul minimal 3 karakter');
      return;
    }
    if (content.trim().length < 10) {
      setFormError('Konten minimal 10 karakter');
      return;
    }
    if (!categoryId) {
      setFormError('Kategori harus dipilih');
      return;
    }

    onSubmit({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      image_url: imageUrl.trim(),
      status,
      category_id: Number(categoryId),
      tags,
    });
  };

  // Tangani enter di input tag
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-6">
      {formError && (
        <div className="bg-red-100 text-red-700 p-3 rounded">{formError}</div>
      )}

      <div>
        <label className="block font-semibold mb-1" htmlFor="title">Judul *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          minLength={3}
          disabled={isSubmitting}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Masukkan judul artikel"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          maxLength={500}
          rows={3}
          disabled={isSubmitting}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Ringkasan singkat (maks 500 karakter)"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="content">Konten *</label>
        <textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          rows={10}
          disabled={isSubmitting}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Isi lengkap artikel"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="image_url">URL Gambar</label>
        <input
          id="image_url"
          type="url"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          disabled={isSubmitting}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="status">Status *</label>
        <select
          id="status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
          disabled={isSubmitting}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="category">Kategori *</label>
        <select
          id="category"
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          required
          disabled={isSubmitting}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">-- Pilih Kategori --</option>
          <option value={1}>NBA</option>
          <option value={2}>IBL</option>
          <option value={3}>FIBA</option>
          <option value={4}>Tutorial</option>
          <option value={5}>Analysis</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Tags</label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Tambahkan tag dan tekan Enter"
            disabled={isSubmitting}
            className="flex-grow px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={addTag}
            disabled={isSubmitting || !tagInput.trim()}
            className="bg-primary text-white px-4 rounded disabled:opacity-50"
          >
            Tambah
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                disabled={isSubmitting}
                className="ml-2 text-red-500 hover:text-red-700 font-bold"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Menyimpan...' : 'Simpan Artikel'}
      </button>
    </form>
  );
};

export default ArticleForm;
