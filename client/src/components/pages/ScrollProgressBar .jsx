import React, { useState, useEffect } from 'react';

const ScrollProgressBar = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Get the vertical scroll position
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollPosition / windowHeight) * 100;
      setScrollWidth(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ width: `${scrollWidth}%` }} className="scroll-progress-bar"></div>
  );
};

export default ScrollProgressBar;
