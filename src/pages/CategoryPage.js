import React, { useState, useEffect } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import NewsList from '../components/NewsList';
import BackToTopButton from '../components/BackToTopButton'; // 导入回到顶部按钮
import newsData from '../data/newsData.json';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const filteredNews = newsData.filter(news => news.category === category);
  const [visibleNews, setVisibleNews] = useState([]);
  const [endOfContent, setEndOfContent] = useState(false);
  const [dislikedNews, setDislikedNews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadMoreNews();
  }, [filteredNews, dislikedNews]);

  const loadMoreNews = () => {
    const newsToDisplay = filteredNews.filter(news => !dislikedNews.includes(news.id));
    if (visibleNews.length < newsToDisplay.length) {
      const newVisibleNews = newsToDisplay.slice(0, visibleNews.length + 5);
      setVisibleNews(newVisibleNews);
      if (newVisibleNews.length >= newsToDisplay.length) {
        setEndOfContent(true);
      }
    } else {
      setEndOfContent(true);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadMoreNews();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleNews, dislikedNews]);

  const handleDislike = (newsId) => {
    setDislikedNews((prev) => [...prev, newsId]);
    setVisibleNews((prev) => prev.filter(news => news.id !== newsId));
  };

  const handleBackToHomeClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="category-container">
      <div className="header">
        <h2 className="category-title">{category} 新闻</h2>
      </div>
      <Link to="/" className="fixed-back-to-home" onClick={handleBackToHomeClick}>
        回到首页
      </Link>
      {filteredNews.length === 0 ? (
        <p className="no-content">当前还没有内容哦。</p>
      ) : (
        <>
          <NewsList news={visibleNews} onDislike={handleDislike} />
          {endOfContent && <div className="end-message">没有更多内容了</div>}
        </>
      )}
      <BackToTopButton /> {/* 添加回到顶部按钮 */}
    </div>
  );
};

export default CategoryPage;
