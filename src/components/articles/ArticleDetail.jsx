const backendBaseURL = 'http://localhost:6543'; // Ganti sesuai backend kamu

const getImageSrc = (url) => {
  if (!url) return '/assets/images/default-article.jpg';
  return /^https?:\/\//i.test(url) ? url : backendBaseURL + url;
};

const ArticleDetail = ({ article }) => {
  if (!article) return null;

  const [isExpanded, setIsExpanded] = useState(false);

  const isLongContent = article.content.length > 1000;
  const displayContent = isLongContent && !isExpanded
    ? article.content.substring(0, 1000) + '...'
    : article.content;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Gambar Artikel */}
      <img
        src={getImageSrc(article.image_url || article.imageUrl)}
        alt={article.title}
        className="w-full h-64 object-cover"
        onError={(e) => { e.target.src = '/assets/images/default-article.jpg'; }}
      />
      
      <div className="p-6">
        {/* Kategori dan Tanggal */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <Link 
            to={`/articles/category/${article.category?.slug}`}
            className="bg-primary text-white px-3 py-1 text-sm font-semibold rounded-md"
          >
            {article.category?.name || 'Uncategorized'}
          </Link>
          <span className="text-gray-500 text-sm">
            {article.published_at
              ? new Date(article.published_at).toLocaleDateString()
              : 'Baru saja'}
          </span>
        </div>

        {/* Judul */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>

        {/* Penulis */}
        <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
          <Link to={`/profile/${article.author?.username}`}>
            <img
              src={getImageSrc(article.author?.avatar_url)}
              alt={article.author?.full_name || article.author?.username || 'Author'}
              className="w-10 h-10 rounded-full mr-4"
              onError={(e) => { e.target.src = '/assets/images/default-avatar.png'; }}
            />
          </Link>
          <div>
            <Link 
              to={`/profile/${article.author?.username}`}
              className="font-medium text-gray-900 hover:text-primary"
            >
              {article.author?.full_name || article.author?.username || 'Anonymous'}
            </Link>
            <p className="text-sm text-gray-500">
              {article.author?.is_admin ? 'Admin' : 'Contributor'}
            </p>
          </div>
        </div>

        {/* Konten Artikel */}
        <div 
          className="prose max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />

        {isLongContent && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-primary hover:text-primary-dark font-medium mb-6"
          >
            Baca Selengkapnya
          </button>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <Link 
                key={tag.id} 
                to={`/articles/tag/${tag.name}`}
                className="bg-gray-100 text-gray-800 px-3 py-1 text-sm rounded-full hover:bg-gray-200"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Share Buttons */}
        <ShareButtons 
          url={window.location.href} 
          title={article.title} 
          description={article.excerpt}
        />
      </div>
    </div>
  );
};

export default ArticleDetail;
