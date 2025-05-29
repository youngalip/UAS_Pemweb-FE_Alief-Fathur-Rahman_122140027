// src/pages/CommunityPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchThreads } from '../features/community/communitySlice';
import ThreadList from '../components/community/ThreadList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CommunityPage = () => {
  const dispatch = useDispatch();
  const { threads, status, error } = useSelector((state) => state.community);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredThreads, setFilteredThreads] = useState([]);

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  // Filter threads based on search query
  useEffect(() => {
    if (threads && threads.length > 0) {
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const filtered = threads.filter(thread => 
          (thread.title && thread.title.toLowerCase().includes(query)) || 
          (thread.content && thread.content.toLowerCase().includes(query))
        );
        setFilteredThreads(filtered);
      } else {
        setFilteredThreads(threads);
      }
    } else {
      setFilteredThreads([]);
    }
  }, [threads, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (status === 'loading' && threads.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white text-center">Forum Komunitas</h1>
          <p className="mt-4 text-xl text-white text-center max-w-3xl mx-auto">
            Diskusikan topik basket favoritmu, berbagi pendapat, dan terhubung dengan sesama penggemar basket.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari diskusi..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Diskusi Terbaru</h2>
            {isAuthenticated && (
            <Link 
                to="/community/create" 
                className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                aria-label="Buat Diskusi Baru"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Buat Diskusi Baru
            </Link>
            )}
        </div>
        
        {error && (
          <div className="text-center py-8 bg-red-50 rounded-lg mb-8">
            <p className="text-red-600">Error: {error}</p>
            <button 
              onClick={() => dispatch(fetchThreads())}
              className="mt-4 text-primary hover:text-primary-dark font-medium"
            >
              Coba Lagi
            </button>
          </div>
        )}
        
        {filteredThreads.length > 0 ? (
          <ThreadList threads={filteredThreads} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            {searchQuery ? (
              <>
                <p className="text-gray-500 mb-4">Tidak ada diskusi yang cocok dengan pencarian Anda.</p>
                <button
                  onClick={() =>
                    setSearchQuery('')}
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  Hapus pencarian
                </button>
              </>
            ) : status === 'succeeded' ? (
              <div className="text-center">
                <p className="text-gray-500 mb-4">Belum ada diskusi yang dibuat.</p>
                {isAuthenticated ? (
                  <Link 
                    to="/community/create" 
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    Mulai diskusi pertama
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    Login untuk memulai diskusi
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Memuat diskusi...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
