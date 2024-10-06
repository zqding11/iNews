import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './BackToTopButton.css'; // 导入样式

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // 当滚动超过300px时显示按钮
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 平滑滚动到顶部
  };

  return (
    <>
      {showButton && (
        <button className="back-to-top" onClick={scrollToTop}>
          <FaArrowUp /> {/* 返回顶部的箭头图标 */}
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
