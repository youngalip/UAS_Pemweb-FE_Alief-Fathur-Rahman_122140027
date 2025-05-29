import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, fetchCategories } from '../features/articles/articlesSlice';
import ArticleCard from '../components/articles/ArticleCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector(state => state.articles);
  const categoriesFromStore = useSelector(state => state.articles.categories);
  
  // Gunakan local state untuk kategori sebagai fallback
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  // Debug untuk melihat data yang diterima
  useEffect(() => {
    console.log('Articles from Redux:', articles);
    console.log('Categories from Redux:', categoriesFromStore);
    console.log('Redux status:', status);
  }, [articles, categoriesFromStore, status]);

  // Fetch data
  useEffect(() => {
    // Dispatch dengan parameter kosong untuk mendapatkan semua artikel
    dispatch(fetchArticles());
    
    // Fetch categories dan tangani error dengan diam
    dispatch(fetchCategories())
      .unwrap()
      .catch(err => {
        console.error('Failed to fetch categories:', err);
        // Set kategori default jika API gagal
        setCategories([
          { id: 1, name: 'NBA' },
          { id: 2, name: 'IBL' },
          { id: 3, name: 'FIBA' }
        ]);
      });
  }, [dispatch]);
  
  // Set local categories dari store atau gunakan default jika kosong
  useEffect(() => {
    if (categoriesFromStore && categoriesFromStore.length > 0) {
      setCategories(categoriesFromStore);
    } else if (status === 'failed' && categories.length === 0) {
      // Fallback categories jika API gagal
      setCategories([
        { id: 1, name: 'NBA' },
        { id: 2, name: 'IBL' },
        { id: 3, name: 'FIBA' }
      ]);
    }
  }, [categoriesFromStore, status, categories.length]);

  // Debug data artikel
  useEffect(() => {
    if (articles && articles.length > 0) {
      console.log('Sample article data structure:');
      console.log(JSON.stringify(articles[0], null, 2));
    }
  }, [articles]);

  // Filter articles
  useEffect(() => {
    if (articles && articles.length > 0) {
      console.log('Filtering articles. Active category:', activeCategory);
      
      let filtered = [...articles];
      
      // Filter by category - dengan penanganan berbagai format data
      if (activeCategory !== 'all') {
        filtered = filtered.filter(article => {
          // Periksa berbagai format kategori
          const { category } = article;
          
          if (!category) return false;
          
          if (typeof category === 'string') {
            return category === activeCategory;
          } else if (category.name) {
            return category.name === activeCategory;
          } else if (category.id) {
            const matchingCategory = categories.find(c => c.id === category.id);
            return matchingCategory && matchingCategory.name === activeCategory;
          }
          return false;
        });
      }
      
      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(article => 
          (article.title && article.title.toLowerCase().includes(query)) || 
          (article.excerpt && article.excerpt.toLowerCase().includes(query))
        );
      }
      
      console.log('Filtered result:', filtered);
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles([]);
    }
  }, [articles, activeCategory, searchQuery, categories]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Render loading state
  if (status === 'loading' && articles.length === 0) {
    return <LoadingSpinner />;
  }

  // Render error state
  if (status === 'failed' && articles.length === 0) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>Error: {error}</p>
        <button 
          onClick={() => dispatch(fetchArticles())}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white text-center">Artikel Basket</h1>
          <p className="mt-4 text-xl text-white text-center max-w-3xl mx-auto">
            Temukan berita terbaru, analisis mendalam, dan cerita menarik dari dunia basket Indonesia dan internasional.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari artikel..."
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
        {/* Categories Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="inline-flex space-x-2 pb-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-md font-medium text-sm ${
                activeCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Semua
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.name)}
                className={`px-4 py-2 rounded-md font-medium text-sm ${
                  activeCategory === category.name
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Memuat artikel...</p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada artikel yang ditemukan.</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-primary hover:text-primary-dark font-medium"
              >
                Hapus pencarian
              </button>
            )}
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-4 ml-4 text-primary hover:text-primary-dark font-medium"
              >
                Tampilkan semua kategori
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredArticles.length > 0 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 rounded-md bg-white text-gray-500 hover:bg-gray-100">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="px-3 py-2 rounded-md bg-primary text-white">1</button>
              <button className="px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-100">2</button>
              <button className="px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-100">3</button>
              <span className="px-3 py-2 text-gray-500">...</span>
              <button className="px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-100">8</button>
              <button className="px-3 py-2 rounded-md bg-white text-gray-500 hover:bg-gray-100">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
