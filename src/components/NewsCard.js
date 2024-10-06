import React from 'react';
import './NewsCard.css'; // 引入样式文件

const NewsCard = ({ news, onDislike }) => {
  return (
    <div className="news-card">
      <img src={news.image} className="news-image" alt={news.title} />
      <div className="news-content">
        <h3 className="news-title">{news.title}</h3>
        <div className="news-footer">
          <div className="footer-info">
            <span className="news-date">{news.date}</span>
            <p className="source">发布媒体: {news.source}</p>
            <span className="news-category">{news.category}</span>
          </div>
          <div className="button-group">
            <a href={`/news/${news.id}`} className="read-more">阅读更多</a>
            <button className="dislike-button" onClick={() => onDislike(news.id)}>不感兴趣</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
