// src/components/NewsList.js
import React from 'react';
import NewsCard from './NewsCard';

const NewsList = ({ news, onDislike }) => {
  return (
    <div>
      {news.map(item => (
        <NewsCard key={item.id} news={item} onDislike={onDislike} />
      ))}
    </div>
  );
};

export default NewsList;
