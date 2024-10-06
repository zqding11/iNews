import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsDetailPage from './pages/NewsDetailPage';
import CategoryPage from './pages/CategoryPage';
import SearchResultsPage from './pages/SearchResultsPage'; // 导入搜索结果页面

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/news/:id" element={<NewsDetailPage />} />
      <Route path="/category/:category" element={<CategoryPage />} /> {/* 分类页面 */}
      <Route path="/search" element={<SearchResultsPage />} /> {/* 确保使用 element */}
    </Routes>
  );
};

export default App;
