import React from 'react';
import { useParams, Link } from 'react-router-dom';
import newsData from '../data/newsData.json';
import './NewsDetailPage.css';

const NewsDetailPage = () => {
  const { id } = useParams();
  const news = newsData.find(item => item.id === parseInt(id));

  if (!news) {
    return <div>未找到该新闻。</div>;
  }

  const handleBackToHomeClick = () => {
    window.scrollTo(0, 0); // 点击链接时滚动到顶部
  };
  
  return (
    <div className="news-detail-container">
      <h1 className="news-title">{news.title}</h1>
      <p className="news-source">来源: {news.source}</p>
      <p className="news-date">{news.date}</p>
      <img src={news.image} alt={news.title} className="news-detail-image" />
      <div className="news-content">
        {news.content}
      </div>
      <Link to="/" className="fixed-back-to-home" onClick={handleBackToHomeClick}>
        回到首页
      </Link> {/* 返回首页的链接 */}
    </div>
  );
};

export default NewsDetailPage;
