import React from 'react';

const VinylRecord = ({ 
  aSideImage, 
  bSideImage, 
  mousePosition, 
  isVinylExtracted, 
  isVinylFlipped, 
  isVinylAnimating, 
  vinylPosition, 
  translateX, 
  translateY, 
  rotateX, 
  rotateY 
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 'min(75vw, 75vh)', // Slightly smaller than album
        height: 'min(75vw, 75vh)',
        transformStyle: 'preserve-3d',
        transform: `
          translate(-50%, -50%)
          ${isVinylExtracted 
            ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isVinylFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}`
            : `translateX(${vinylPosition}%) translateZ(-50px)`
          }
        `,
        transition: isVinylAnimating || isVinylExtracted ? 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.1s ease-out',
        opacity: vinylPosition > 0 ? 1 : 0,
        zIndex: isVinylExtracted ? 5 : 2,
        cursor: isVinylExtracted ? 'grab' : 'default'
      }}
    >
      {/* Vinyl A-Side */}
      <div
        style={{
          position: 'absolute',
          width: 'calc(100% - 12px)',
          height: 'calc(100% - 12px)',
          top: '6px',
          left: '6px',
          backfaceVisibility: 'hidden',
          backgroundImage: `url(${aSideImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: '50%',
          boxShadow: `
            0 25px 50px rgba(0,0,0,0.5),
            inset 0 0 100px rgba(0, 0, 0, 0.1),
            0 0 60px rgba(255,255,255,0.05)
          `,
          imageRendering: 'crisp-edges',
          filter: `brightness(${1 + (mousePosition.x - 0.5) * 0.3}) contrast(${1 + (mousePosition.y - 0.5) * 0.2})`
        }}
      >
        {/* Vinyl shine effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(ellipse at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(255,255,255,0.4) 0%, 
              rgba(255,255,255,0.2) 20%, 
              rgba(255,255,255,0.05) 40%, 
              transparent 60%)`,
            pointerEvents: 'none',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
      
      {/* Vinyl B-Side */}
      <div
        style={{
          position: 'absolute',
          width: 'calc(100% - 12px)',
          height: 'calc(100% - 12px)',
          top: '6px',
          left: '6px',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          backgroundImage: `url(${bSideImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: '50%',
          boxShadow: `
            0 25px 50px rgba(0,0,0,0.5),
            inset 0 0 100px rgba(0, 0, 0, 0.1),
            0 0 60px rgba(255,255,255,0.05)
          `,
          imageRendering: 'crisp-edges',
          filter: `brightness(${1 + (mousePosition.x - 0.5) * 0.3}) contrast(${1 + (mousePosition.y - 0.5) * 0.2})`
        }}
      >
        {/* Vinyl shine effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(ellipse at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(255,255,255,0.4) 0%, 
              rgba(255,255,255,0.2) 20%, 
              rgba(255,255,255,0.05) 40%, 
              transparent 60%)`,
            pointerEvents: 'none',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
    </div>
  );
};

export default VinylRecord; 