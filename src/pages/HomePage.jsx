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
