import React, { useState, useEffect } from 'react';
import AlbumCover from './AlbumCover';
import VinylRecord from './VinylRecord';

const EPCarousel = ({
  data,
  currentIndex,
  mousePosition,
  isFlipped,
  isAnimating,
  isVinylExtracted,
  isVinylFlipped,
  isVinylAnimating,
  vinylPosition,
  translateX,
  translateY,
  rotateX,
  rotateY,
  albumRef,
  onTransitionComplete
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(currentIndex);

  useEffect(() => {
    if (currentIndex !== displayIndex) {
      setIsTransitioning(true);
      
      // Start transition after a short delay
      const transitionTimer = setTimeout(() => {
        setDisplayIndex(currentIndex);
        
        // Complete transition
        const completeTimer = setTimeout(() => {
          setIsTransitioning(false);
          onTransitionComplete?.();
        }, 800);
        
        return () => clearTimeout(completeTimer);
      }, 200);
      
      return () => clearTimeout(transitionTimer);
    }
  }, [currentIndex, displayIndex, onTransitionComplete]);

  const currentEP = data[displayIndex];
  const rotationAngle = isTransitioning ? 180 : 0;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transform: `rotateY(${rotationAngle}deg)`,
        transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Album Cover Component */}
      <AlbumCover
        frontImage={currentEP.images.front}
        backImage={currentEP.images.back}
        mousePosition={mousePosition}
        isFlipped={isFlipped}
        isAnimating={isAnimating}
        isVinylExtracted={isVinylExtracted}
        translateX={translateX}
        translateY={translateY}
        rotateX={rotateX}
        rotateY={rotateY}
        albumRef={albumRef}
      />

      {/* Vinyl Record Component */}
      <VinylRecord
        aSideImage={currentEP.images.aSide}
        bSideImage={currentEP.images.bSide}
        mousePosition={mousePosition}
        isVinylExtracted={isVinylExtracted}
        isVinylFlipped={isVinylFlipped}
        isVinylAnimating={isVinylAnimating}
        vinylPosition={vinylPosition}
        translateX={translateX}
        translateY={translateY}
        rotateX={rotateX}
        rotateY={rotateY}
      />
    </div>
  );
};

export default EPCarousel; 