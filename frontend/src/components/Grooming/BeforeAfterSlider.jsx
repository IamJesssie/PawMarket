import React, { useState, useRef, useEffect } from 'react';
import styles from './BeforeAfterSlider.module.css';

const BeforeAfterSlider = ({ before, after, petName, breed }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!isResizing && e.type !== 'mousemove' && e.type !== 'touchmove') return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.pageX || e.touches[0].pageX;
    const relativeX = x - containerRect.left;
    const position = Math.max(0, Math.min(100, (relativeX / containerRect.width) * 100));
    
    setSliderPos(position);
  };

  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div 
        className={styles.container} 
        ref={containerRef}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        <div className={styles.afterImage} style={{ backgroundImage: `url(${after})` }} />
        
        <div 
          className={styles.beforeImage} 
          style={{ 
            backgroundImage: `url(${before})`,
            width: `${sliderPos}%`
          }} 
        />

        <div 
          className={styles.sliderLine} 
          style={{ left: `${sliderPos}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className={styles.sliderButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
        </div>

        <div className={styles.labels}>
          <span className={styles.beforeLabel}>Before</span>
          <span className={styles.afterLabel}>After</span>
        </div>
      </div>
      
      <div className={styles.info}>
        <h3>{petName}</h3>
        <p>{breed}</p>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
