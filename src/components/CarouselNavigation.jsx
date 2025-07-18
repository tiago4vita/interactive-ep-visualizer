import React from 'react';

const CarouselNavigation = ({ 
  data, 
  currentIndex, 
  onNavigate, 
  isVinylExtracted 
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '15px',
        zIndex: 15,
        padding: '15px 25px',
        background: isVinylExtracted 
          ? 'rgba(255,255,255,0.9)' 
          : 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '25px',
        border: `1px solid ${isVinylExtracted ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'}`,
        transition: 'all 0.3s ease',
        opacity: isVinylExtracted ? 0 : 1,
        pointerEvents: isVinylExtracted ? 'none' : 'auto',
        visibility: isVinylExtracted ? 'hidden' : 'visible'
      }}
    >
      {data.map((_, index) => (
        <button
          key={index}
          onClick={() => onNavigate(index)}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: 'none',
            background: index === currentIndex 
              ? (isVinylExtracted ? '#333' : '#fff')
              : (isVinylExtracted ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)'),
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)',
            boxShadow: index === currentIndex 
              ? '0 0 10px rgba(255,255,255,0.5)' 
              : 'none'
          }}
          aria-label={`Navigate to EP ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselNavigation; 