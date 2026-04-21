import React from 'react';

const StarRating = ({ rating, size = 16, color = '#fa782d' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return (
            <svg key={index} width={size} height={size} viewBox="0 0 24 24" fill={color}>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <svg key={index} width={size} height={size} viewBox="0 0 24 24">
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor={color} />
                  <stop offset="50%" stopColor="#e4e3db" />
                </linearGradient>
              </defs>
              <path fill="url(#half)" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          );
        } else {
          return (
            <svg key={index} width={size} height={size} viewBox="0 0 24 24" fill="#e4e3db">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          );
        }
      })}
    </div>
  );
};

export default StarRating;
