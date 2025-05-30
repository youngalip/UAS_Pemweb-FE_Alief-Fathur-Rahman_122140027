import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreadById , deleteThread } from '../features/community/communitySlice';
import CommentSection from '../components/community/CommentSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { formatDistanceToNow } from 'date-fns';
import { FaEdit, FaTrash, FaComment, FaTag } from 'react-icons/fa';
import { id } from 'date-fns/locale';

const ThreadDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentThread, status, error } = useSelector(state => state.community);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchThreadById(id));
    }
  }, [dispatch, id]);
  
  const extractTagName = (tag) => {
    if (!tag) return '';

    // Jika tag adalah objek dengan properti name
    if (tag && typeof tag.name === 'string') {
      // Jika tag.name masih berupa representasi string tag, ekstrak nama aslinya
      if (tag.name.includes("<Tag(name=")) {
        return extractTagName(tag.name); // Rekursif untuk menangani kasus bersarang
      }
      return tag.name;
    }

    // Jika tag adalah string
    if (typeof tag === 'string') {
      // Jika tag berupa representasi string tag, ekstrak nama aslinya
      if (tag.includes("<Tag(name=")) {
        // Ekstrak rekursif untuk menangani kasus bersarang
        let current = tag;
        let depth = 0;
        const maxDepth = 10; // Batasi kedalaman rekursi untuk menghindari loop tak terbatas
        
        while (current.includes("<Tag(name=") && depth < maxDepth) {
          const match = current.match(/name=['"]([^'"]+)['"]/);
          if (!match) break;
          
          current = match[1];
          depth++;
        }
        
        return current;
      }
      return tag;
    }

    // Fallback: konversi ke string dan coba ekstrak nama
    const tagStr = String(tag);
    const match = tagStr.match(/name=['"]([^'"]+)['"]/);
    return match ? match[1] : tagStr;
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: id // Gunakan locale Indonesia jika diperlukan
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Fallback ke string tanggal asli
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this thread?')) {
      try {
        await dispatch(deleteThread(id)).unwrap();
        setDeleteSuccess(true);
        setTimeout(() => {
          navigate('/community');
        }, 1500);
      } catch (error) {
        console.error('Failed to delete thread:', error);
      }
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
  
  const isOwner = user && currentThread.user_id === user.id;
  const isAdmin = user && user.isAdmin;
  
  return (
    <div className="max-w-4xl mx-auto">
      {deleteSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Thread deleted successfully! Redirecting...
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <img 
            src={currentThread.user?.avatar_url || '/assets/images/default-avatar.png'} 
            alt={currentThread.user?.username || 'User'} 
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="font-medium text-lg">{currentThread.user?.username || 'Anonymous'}</h3>
            <p className="text-gray-500">{formatDate(currentThread.created_at)}</p>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{currentThread.title}</h1>
        
        <div className="prose max-w-none mb-6">
          {currentThread.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        {currentThread.tags && currentThread.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
            {currentThread.tags.map((tag, index) => (
                <span 
                key={index} 
                className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                <FaTag className="mr-1 text-gray-500" size={12} /> {extractTagName(tag)}
                </span>
            ))}
        </div>
        )}
        
        {(isOwner || isAdmin) && (
          <div className="flex gap-4 mt-6 border-t pt-4">
            <Link 
              to={`/community/edit/${currentThread.id}`}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaEdit className="mr-2" /> Edit Thread
            </Link>
            <button 
              onClick={handleDelete}
              className="flex items-center text-red-500 hover:text-red-700 transition-colors"
            >
              <FaTrash className="mr-2" /> Delete Thread
            </button>
          </div>
        )}
      </div>
      
      <CommentSection 
        threadId={currentThread.id} 
        comments={currentThread.comments || []} 
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default ThreadDetailPage;
