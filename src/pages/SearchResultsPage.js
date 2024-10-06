import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import NewsList from '../components/NewsList';
import BackToTopButton from '../components/BackToTopButton'; // 引入回到顶部按钮
import newsData from '../data/newsData.json';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const query = new URLSearchParams(useLocation().search).get('query');
  const filteredNews = newsData.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.content.toLowerCase().includes(query.toLowerCase())
  );

  const [visibleNews, setVisibleNews] = useState([]);
  const [endOfContent, setEndOfContent] = useState(false);
  const [dislikedNews, setDislikedNews] = useState([]); // 新增不感兴趣的新闻状态

  useEffect(() => {
    loadMoreNews(); // 初始加载新闻
  }, [filteredNews, dislikedNews]); // 依赖于 dislikedNews

  const loadMoreNews = () => {
    const newsToDisplay = filteredNews.filter(news => !dislikedNews.includes(news.id)); // 过滤不感兴趣的新闻
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
  }, [visibleNews]);

  const handleDislike = (newsId) => {
    setDislikedNews((prev) => [...prev, newsId]);
    setVisibleNews((prev) => prev.filter(news => news.id !== newsId)); // 从可见新闻中移除
  };

  const handleBackToHomeClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h2>搜索结果: "{query}"</h2>
      {visibleNews.length > 0 ? (
        <>
          <NewsList news={visibleNews} onDislike={handleDislike} />
          {endOfContent && <p className="end-message">没有更多内容了</p>}
        </>
      ) : (
        <p>没有找到相关的新闻。</p>
      )}
      <Link to="/" className="fixed-back-to-home" onClick={handleBackToHomeClick}>
        回到首页
      </Link>

      {/* 添加回到顶部按钮 */}
      <BackToTopButton />
    </div>
  );
};

export default SearchResultsPage;
