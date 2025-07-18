import React from 'react';

const AlbumCover = ({ 
  frontImage, 
  backImage, 
  mousePosition, 
  isFlipped, 
  isAnimating, 
  isVinylExtracted, 
  translateX, 
  translateY, 
  rotateX, 
  rotateY,
  albumRef 
}) => {
  return (
    <div
      ref={albumRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 'min(80vw, 80vh)',
        height: 'min(80vw, 80vh)',
        transformStyle: 'preserve-3d',
        transform: `
          translate(-50%, -50%)
          translateX(${translateX}px) 
          translateY(${translateY}px) 
          translateZ(0px)
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg)
          ${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}
          ${isVinylExtracted ? 'translateX(-200%) scale(0.8)' : 'translateX(0%)'}
        `,
        transition: isAnimating || isVinylExtracted ? 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.1s ease-out',
        cursor: !isVinylExtracted ? 'grab' : 'default',
        opacity: isVinylExtracted ? 0.3 : 1,
        zIndex: isVinylExtracted ? 1 : 3
      }}
    >
      {/* Album Thickness/Spine */}
      <div
        style={{
          position: 'absolute',
          top: 5,
          left: 5,
          width: '99%',
          height: '99%',
          borderRadius: '2px',
          background: 'rgba(220,220,220,0.15)', // light grey, low opacity
          transform: 'translateZ(3px)',
          boxShadow: `
            0 0 0 2px #333,
            0 0 0 4px #222,
            0 0 0 6px #111,
            0 40px 80px rgba(0,0,0,0.4)
          `
        }}
      />

      {/* Album Front Cover */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          backgroundImage: `url(${frontImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: '8px',
          transform: 'translateZ(4px)',
          boxShadow: `
            0 20px 40px rgba(0,0,0,0.3),
            inset 0 0 60px rgba(255,255,255,0.1),
            0 0 40px rgba(255,255,255,0.05)
          `,
          border: '2px solid rgba(255,255,255,0.1)',
          imageRendering: 'crisp-edges',
          filter: `brightness(${1 + (mousePosition.x - 0.5) * 0.2}) contrast(${1 + (mousePosition.y - 0.5) * 0.15})`
        }}
      >
        {/* Album cover shine effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            background: `linear-gradient(${45 + mousePosition.x * 90}deg, 
              rgba(255,255,255,0.3) 0%, 
              rgba(255,255,255,0.1) 30%, 
              transparent 50%, 
              rgba(255,255,255,0.1) 70%, 
              rgba(255,255,255,0.2) 100%)`,
            pointerEvents: 'none',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
      
      {/* Album Back Cover */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg) translateZ(4px)',
          backgroundImage: `url(${backImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: '8px',
          boxShadow: `
            0 20px 40px rgba(0,0,0,0.3),
            inset 0 0 60px rgba(255,255,255,0.1),
            0 0 40px rgba(255,255,255,0.05)
          `,
          border: '2px solid rgba(255,255,255,0.1)',
          imageRendering: 'crisp-edges',
          filter: `brightness(${1 + (mousePosition.x - 0.5) * 0.2}) contrast(${1 + (mousePosition.y - 0.5) * 0.15})`
        }}
      >
        {/* Album cover shine effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            background: `linear-gradient(${45 + mousePosition.x * 90}deg, 
              rgba(255,255,255,0.3) 0%, 
              rgba(255,255,255,0.1) 30%, 
              transparent 50%, 
              rgba(255,255,255,0.1) 70%, 
              rgba(255,255,255,0.2) 100%)`,
            pointerEvents: 'none',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
    </div>
  );
};

export default AlbumCover; 