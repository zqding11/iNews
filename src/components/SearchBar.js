import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 替换为 useNavigate
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css'; // 引入样式文件

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // 获取 navigate 函数

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`); // 使用 navigate 跳转
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // 按下回车键时执行搜索
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="搜索新闻..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="search-bar"
      />
      <button onClick={handleSearch} className="search-button">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
