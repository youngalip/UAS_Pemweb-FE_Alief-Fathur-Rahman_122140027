// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../features/articles/articlesSlice';
import HeroSection from '../components/home/HeroSection';
import LatestNews from '../components/home/LatestNews';
import FeaturedTeams from '../components/home/FeaturedTeams';
import PopularArticles from '../components/home/PopularArticles';
import CommunitySection from '../components/home/CommunitySection';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HomePage = () => {
  const dispatch = useDispatch();
  const { articles, status } = useSelector(state => state.articles);
  const [dummyArticles, setDummyArticles] = useState([]);

  useEffect(() => {
    dispatch(fetchArticles());
    
    // Tambahkan data dummy untuk development
    const dummyData = [
      {
        id: 1,
        title: "Hasil Pertandingan NBA Semalam: Lakers Kalahkan Warriors",
        excerpt: "Los Angeles Lakers berhasil mengalahkan Golden State Warriors dengan skor 120-110 dalam pertandingan sengit semalam.",
        imageUrl: "https://source.unsplash.com/random/1200x800/?basketball",
        category: "NBA",
        publishedDate: "2 jam yang lalu",
        author: {
          name: "John Doe",
          avatarUrl: "https://source.unsplash.com/random/100x100/?person"
        },
        views: 1250
      },
      {
        id: 2,
        title: "Preview IBL 2025: Tim-Tim Unggulan Musim Ini",
        excerpt: "Menjelang musim IBL 2025, beberapa tim diprediksi akan menjadi unggulan berdasarkan performa pra-musim mereka.",
        imageUrl: "https://source.unsplash.com/random/1200x800/?court",
        category: "IBL",
        publishedDate: "5 jam yang lalu",
        author: {
          name: "Jane Smith",
          avatarUrl: "https://source.unsplash.com/random/100x100/?woman"
        },
        views: 980
      },
      {
        id: 3,
        title: "Pemain Muda Indonesia yang Berpotensi Masuk NBA",
        excerpt: "Beberapa pemain muda Indonesia menunjukkan potensi besar dan menarik perhatian scout NBA dalam beberapa tahun terakhir.",
        imageUrl: "https://source.unsplash.com/random/1200x800/?athlete",
        category: "Profil",
        publishedDate: "1 hari yang lalu",
        author: {
          name: "Mike Johnson",
          avatarUrl: "https://source.unsplash.com/random/100x100/?man"
        },
        views: 765
      },
      {
        id: 4,
        title: "Teknik Dasar Shooting dalam Basket yang Perlu Dikuasai",
        excerpt: "Menguasai teknik shooting yang baik adalah kunci untuk menjadi pemain basket yang handal. Simak tips berikut ini.",
        imageUrl: "https://source.unsplash.com/random/1200x800/?shooting",
        category: "Tutorial",
        publishedDate: "2 hari yang lalu",
        author: {
          name: "Sarah Williams",
          avatarUrl: "https://source.unsplash.com/random/100x100/?coach"
        },
        views: 1100
      },
      {
        id: 5,
        title: "Sejarah Perkembangan Basket di Indonesia",
        excerpt: "Perjalanan olahraga basket di Indonesia memiliki sejarah panjang yang menarik untuk diketahui.",
        imageUrl: "https://source.unsplash.com/random/1200x800/?history",
        category: "Sejarah",
        publishedDate: "3 hari yang lalu",
        author: {
          name: "Robert Chen",
          avatarUrl: "https://source.unsplash.com/random/100x100/?professor"
        },
        views: 890
      }
    ];
    
    setDummyArticles(dummyData);
  }, [dispatch]);

  if (status === 'loading' && articles.length === 0 && dummyArticles.length === 0) {
    return <LoadingSpinner />;
  }

  // Gunakan data dari Redux store jika ada, jika tidak gunakan data dummy
  const articlesToDisplay = articles.length > 0 ? articles : dummyArticles;
  
  // Find featured article (first article or a specific one)
  const featuredArticle = articlesToDisplay.length > 0 ? articlesToDisplay[0] : null;
  
  // Get latest articles (excluding the featured one)
  const latestArticles = articlesToDisplay.length > 0 
    ? articlesToDisplay.slice(1, 7)
    : [];
  
  // Get popular articles (could be based on views in a real app)
  const popularArticles = articlesToDisplay.length > 0
    ? [...articlesToDisplay].sort((a, b) => b.views - a.views).slice(0, 4)
    : [];

  return (
    <div>
      {/* Hero Section with Featured Article */}
      <HeroSection featuredArticle={featuredArticle} />

      {/* Latest News Section */}
      <LatestNews articles={latestArticles} />

      {/* Featured Teams Section */}
      <FeaturedTeams />

      {/* Popular Articles Section */}
      <PopularArticles articles={popularArticles} />

      {/* Community Section */}
      <CommunitySection />
    </div>
  );
};

export default HomePage;
