import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminThreads, deleteAdminThread } from '../../features/admin/adminSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Button from '../../components/common/button';
import { Link } from 'react-router-dom';

const ManageThreads = () => {
  const dispatch = useDispatch();
  const { threads, status, error } = useSelector(state => state.admin);
  const [selectedThreads, setSelectedThreads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [filteredThreads, setFilteredThreads] = useState([]);

  useEffect(() => {
    // Log user info
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Current user:', user);
    console.log('Is admin:', user.isAdmin);
    dispatch(fetchAdminThreads())
      .unwrap()
      .then(data => {
        console.log('Admin threads data:', data);
      })
      .catch(err => {
        console.error('Error fetching admin threads:', err);
      });
  }, [dispatch]);

  useEffect(() => {
    // Pastikan threads adalah array sebelum difilter
    if (threads && Array.isArray(threads)) {
      let filtered = [...threads];
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(thread => 
          (thread.title?.toLowerCase() || '').includes(query) || 
          (thread.author?.name?.toLowerCase() || '').includes(query) ||
          (thread.author?.username?.toLowerCase() || '').includes(query)
        );
      }
      
      // Filter by tag
      if (filterTag !== 'all') {
        filtered = filtered.filter(thread => 
          thread.tags && thread.tags.some(tag => 
            tag.id === filterTag || tag.name === filterTag
          )
        );
      }
      
      setFilteredThreads(filtered);
    } else {
      // Jika threads bukan array, set filteredThreads ke array kosong
      setFilteredThreads([]);
      console.error('Threads is not an array:', threads);
    }
  }, [threads, searchQuery, filterTag]);

  const handleSelectThread = (threadId) => {
    if (selectedThreads.includes(threadId)) {
      setSelectedThreads(selectedThreads.filter(id => id !== threadId));
    } else {
      setSelectedThreads([...selectedThreads, threadId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked && Array.isArray(filteredThreads)) {
      setSelectedThreads(filteredThreads.map(thread => thread.id));
    } else {
      setSelectedThreads([]);
    }
  };

  const handleDeleteThread = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus thread ini?')) {
      dispatch(deleteAdminThread(id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${selectedThreads.length} thread?`)) {
      selectedThreads.forEach(id => dispatch(deleteAdminThread(id)));
      setSelectedThreads([]);
    }
  };

  if (status === 'loading' && (!threads || threads.length === 0)) {
    return <LoadingSpinner />;
  }

  // Get unique tags for filter
  const uniqueTags = Array.isArray(threads) 
    ? [...new Set(threads.flatMap(thread => 
        thread.tags ? thread.tags.map(tag => tag.name) : []
      ))]
    : [];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manajemen Komunitas</h2>
        <div className="flex space-x-2">
          {selectedThreads.length > 0 && (
            <Button
              onClick={handleBulkDelete}
              variant="danger"
            >
              Hapus ({selectedThreads.length})
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Cari Thread
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
          <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
            Tag
          </label>
          <select
            id="tag"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="all">Semua Tag</option>
            {uniqueTags.map((tag, index) => (
              <option key={index} value={tag}>{tag}</option>
            ))}
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
                  checked={selectedThreads.length === filteredThreads.length && filteredThreads.length > 0}
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Judul
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Penulis
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Komentar
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
            {Array.isArray(filteredThreads) && filteredThreads.length > 0 ? (
              filteredThreads.map((thread) => (
                <tr key={thread.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      onChange={() => handleSelectThread(thread.id)}
                      checked={selectedThreads.includes(thread.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      <Link to={`/community/thread/${thread.id}`} className="hover:text-primary">
                        {thread.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <img 
                          className="h-8 w-8 rounded-full" 
                          src={thread.author?.avatarUrl || '/assets/images/default-avatar.png'} 
                          alt={thread.author?.name || 'Author'} 
                          onError={(e) => { e.target.src = '/assets/images/default-avatar.png'; }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {thread.author?.name || thread.author?.username || 'Unknown'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {thread.tags && thread.tags.map((tag, index) => (
                                               <span 
                          key={index} 
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                        >
                          {tag.name}
                        </span>
                      ))}
                      {(!thread.tags || thread.tags.length === 0) && (
                        <span className="text-gray-500 text-xs">No tags</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {thread.comment_count || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {thread.created_at && new Date(thread.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteThread(thread.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  {status === 'loading' 
                    ? 'Memuat thread...' 
                    : status === 'failed' 
                      ? `Error: ${error}` 
                      : 'Tidak ada thread yang ditemukan.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageThreads;

