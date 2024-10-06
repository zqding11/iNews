import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsList from '../components/NewsList';
import SearchBar from '../components/SearchBar';
import newsData from '../data/newsData.json'; // 引入数据
import './HomePage.css';
import { FaCaretDown, FaArrowUp } from 'react-icons/fa'; // 引入返回顶部图标

const HomePage = () => {
  const [showMore, setShowMore] = useState(false);
  const [news, setNews] = useState(newsData); // 存储新闻数据
  const [searchQuery, setSearchQuery] = useState('');
  const [endOfContent, setEndOfContent] = useState(false); // 新增状态
  const [dislikedNewsIds, setDislikedNewsIds] = useState([]); // 存储不感兴趣的新闻ID
  const [showBackToTop, setShowBackToTop] = useState(false); // 控制是否显示返回顶部按钮

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  const hideMore = () => {
    setShowMore(false);
  };

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) && !dislikedNewsIds.includes(item.id)
  );

  const handleDislike = (id) => {
    setDislikedNewsIds([...dislikedNewsIds, id]);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !endOfContent) {
        loadMoreContent();
      }
      if (window.scrollY > 300) { // 当用户滚动超过300px时显示按钮
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [endOfContent]);

  const loadMoreContent = () => {
    if (filteredNews.length < news.length) {
      // 可以在这里添加逻辑来加载更多内容
    } else {
      setEndOfContent(true); // 没有更多内容
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 平滑滚动到顶部
  };

  return (
    <div className="homepage-container">
      <div className="background">
        <h1 className="title">今时头条</h1>
        <SearchBar setSearchQuery={setSearchQuery} />
      </div>

      <div className="category-section">
        <ul className="category-list">
          <li><Link to="/category/国内">国内</Link></li>
          <li><Link to="/category/国际">国际</Link></li>
          <li><Link to="/category/体育">体育</Link></li>
          <li><Link to="/category/娱乐">娱乐</Link></li>
          <li><Link to="/category/科技">科技</Link></li>
          <li><Link to="/category/财经">财经</Link></li>
          <li>
            <span className="more-link" onClick={toggleMore}>
              更多 <FaCaretDown />
            </span>
            {showMore && (
              <ul className="more-categories" onDoubleClick={hideMore}>
                <li><Link to="/category/商业">商业</Link></li>
                <li><Link to="/category/生活方式">生活方式</Link></li>
                <li><Link to="/category/健康">健康</Link></li>
                <li><Link to="/category/科学">科学</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      <div className="news-section">
        <NewsList news={filteredNews} onDislike={handleDislike} /> {/* 传递不感兴趣的处理函数 */}
      </div>

      {endOfContent && <div className="end-message">没有更多内容了</div>} {/* 提示信息 */}

      {showBackToTop && ( // 当 showBackToTop 为 true 时显示按钮
        <button className="back-to-top" onClick={scrollToTop}>
          <FaArrowUp /> {/* 返回顶部图标 */}
        </button>
      )}
    </div>
  );
};

export default HomePage;
