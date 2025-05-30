// src/pages/admin/ManageArticles.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, deleteArticle } from '../../features/admin/adminSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Button from '../../components/common/button';
import { Link } from 'react-router-dom';

const ManageArticles = () => {
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector(state => state.admin);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    dispatch(fetchArticles());
    // Debug: log token dan response
    console.log('Token:', localStorage.getItem('token'));
  }, [dispatch]);

  useEffect(() => {
    // Pastikan articles adalah array sebelum difilter
    if (articles && Array.isArray(articles)) {
      let filtered = [...articles];
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(article => 
          article.title?.toLowerCase().includes(query) || 
          article.author?.name?.toLowerCase().includes(query)
        );
      }
      
      // Filter by category
      if (filterCategory !== 'all') {
        filtered = filtered.filter(article => {
          if (typeof article.category === 'string') {
            return article.category === filterCategory;
          }
          return article.category?.name === filterCategory || article.category?.id === filterCategory;
        });
      }
      
      // Filter by status
      if (filterStatus !== 'all') {
        filtered = filtered.filter(article => article.status === filterStatus);
      }
      
      setFilteredArticles(filtered);
    } else {
      // Jika articles bukan array, set filteredArticles ke array kosong
      setFilteredArticles([]);
      console.error('Articles is not an array:', articles);
    }
  }, [articles, searchQuery, filterCategory, filterStatus]);

  const handleSelectArticle = (articleId) => {
    if (selectedArticles.includes(articleId)) {
      setSelectedArticles(selectedArticles.filter(id => id !== articleId));
    } else {
      setSelectedArticles([...selectedArticles, articleId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked && Array.isArray(filteredArticles)) {
      setSelectedArticles(filteredArticles.map(article => article.id));
    } else {
      setSelectedArticles([]);
    }
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      dispatch(deleteArticle(id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${selectedArticles.length} artikel?`)) {
      selectedArticles.forEach(id => dispatch(deleteArticle(id)));
      setSelectedArticles([]);
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  // Debug: log response dari API
  console.log('Articles from API:', articles);

  // Get unique categories for filter - dengan validasi
  const categories = Array.isArray(articles) 
    ? [...new Set(articles.map(article => {
        if (typeof article.category === 'string') return article.category;
        return article.category?.name || article.category?.id;
      }))]
      .filter(Boolean) 
    : [];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manajemen Artikel</h2>
        <div className="flex space-x-2">
          <Button
            to="/admin/articles/create"
            variant="primary"
          >
            Tambah Artikel
          </Button>
          {selectedArticles.length > 0 && (
            <Button
              onClick={handleBulkDelete}
              variant="danger"
            >
              Hapus ({selectedArticles.length})
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Cari Artikel
          </label>
          <input
            type="text"
            id="search"
            placeholder="Cari judul atau penulis..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            id="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Semua Kategori</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="published">Dipublikasi</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  onChange={handleSelectAll}
                  checked={selectedArticles.length === filteredArticles.length && filteredArticles.length > 0}
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Judul
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Penulis
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(filteredArticles) && filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      onChange={() => handleSelectArticle(article.id)}
                      checked={selectedArticles.includes(article.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      <Link to={`/articles/${article.id}`} className="hover:text-primary">
                        {article.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <img 
                          className="h-8 w-8 rounded-full" 
                          src={article.author?.avatarUrl || '/assets/images/default-avatar.png'} 
                          alt={article.author?.name || 'Author'} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {article.author?.name || 'Unknown'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {typeof article.category === 'string' 
                        ? article.category 
                        : article.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      article.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {article.status === 'published' ? 'Dipublikasi' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {article.publishedDate || article.published_at || 
                      (article.created_at && new Date(article.created_at).toLocaleDateString())}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/admin/articles/edit/${article.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  {status === 'loading' 
                    ? 'Memuat artikel...' 
                    : status === 'failed' 
                      ? `Error: ${error}` 
                      : 'Tidak ada artikel yang ditemukan.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageArticles;
