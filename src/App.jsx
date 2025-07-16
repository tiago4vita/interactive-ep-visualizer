import React, { useState, useEffect, useRef } from 'react';
import MouseTracker from './components/MouseTracker';
import afxFront from './assets/afx_selected8582_front.jpg';
import afxBack from './assets/afx_selected8582_back.jpg';
import afxASide from './assets/afx_selected8582_aside.jpg';
import afxBSide from './assets/afx_selected8582_bside.jpg';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Vinyl extraction states
  const [isVinylExtracted, setIsVinylExtracted] = useState(false);
  const [vinylPosition, setVinylPosition] = useState(0); // 0 to 100 (percentage)
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isVinylFlipped, setIsVinylFlipped] = useState(false);
  const [isVinylAnimating, setIsVinylAnimating] = useState(false);
  
  const albumRef = useRef(null);

  const handleMouseMove = (position) => {
    setMousePosition(position);
    
    if (!isVinylExtracted) {
      // Check if cursor is near lateral borders for album flip (only when vinyl not extracted)
      const borderThreshold = 0.1;
      const shouldFlip = position.x <= borderThreshold || position.x >= (1 - borderThreshold);
      
      if (shouldFlip && !isFlipped && !isAnimating) {
        setIsAnimating(true);
        setIsFlipped(true);
      } else if (!shouldFlip && isFlipped && !isAnimating) {
        setIsAnimating(true);
        setIsFlipped(false);
      }
    } else {
      // Check for vinyl flip when extracted
      const borderThreshold = 0.1;
      const shouldFlipVinyl = position.x <= borderThreshold || position.x >= (1 - borderThreshold);
      
      if (shouldFlipVinyl && !isVinylFlipped && !isVinylAnimating) {
        setIsVinylAnimating(true);
        setIsVinylFlipped(true);
      } else if (!shouldFlipVinyl && isVinylFlipped && !isVinylAnimating) {
        setIsVinylAnimating(true);
        setIsVinylFlipped(false);
      }
    }
  };

  // Handle album animation end
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Handle vinyl animation end
  useEffect(() => {
    if (isVinylAnimating) {
      const timer = setTimeout(() => {
        setIsVinylAnimating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isVinylAnimating]);

  // Mouse event handlers for vinyl extraction/storage
  const handleMouseDown = (event) => {
    if (event.button === 0) { // Left click only
      if (!isVinylExtracted && !isFlipped) {
        // Allow extraction only when front cover is shown
        setIsDragging(true);
        setDragStart({ x: event.clientX, y: event.clientY });
        event.preventDefault();
      } else if (isVinylExtracted) {
        // Allow storage when vinyl is extracted - remove the album cover condition
        setIsDragging(true);
        setDragStart({ x: event.clientX, y: event.clientY });
        event.preventDefault();
      }
    }
  };

  const handleMouseMoveGlobal = (event) => {
    if (isDragging && !isVinylExtracted) {
      const deltaX = event.clientX - dragStart.x;
      const minDrag = 50; // Minimum pixels to drag
      
      if (deltaX > minDrag) {
        const progress = Math.min((deltaX - minDrag) / 200, 1); // 200px total drag distance
        setVinylPosition(progress * 100);
        
        // Complete extraction
        if (progress >= 1) {
          setIsVinylExtracted(true);
          setIsDragging(false);
        }
      }
    } else if (isDragging && isVinylExtracted) {
      // Handle storing vinyl back when extracted
      const deltaX = event.clientX - dragStart.x;
      
      // For storing, we want any leftward movement
      if (deltaX < 0) {
        const progress = Math.min(Math.abs(deltaX) / 200, 1); // 200px total drag distance left
        setVinylPosition(100 - (progress * 100)); // Decrease from 100% to 0%
        
        // Complete storage
        if (progress >= 1) {
          setIsVinylExtracted(false);
          setVinylPosition(0);
          setIsDragging(false);
          setIsVinylFlipped(false);
          setIsVinylAnimating(false);
        }
      } else {
        // If dragging right while vinyl is extracted, keep it at 100%
        setVinylPosition(100);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging && !isVinylExtracted) {
      // If not enough drag during extraction, reset vinyl position
      setVinylPosition(0);
    } else if (isDragging && isVinylExtracted) {
      // If not enough drag during storage, keep vinyl extracted
      setVinylPosition(100);
    }
    setIsDragging(false);
  };

  // Global mouse event listeners
  useEffect(() => {
    // Always listen for mousedown to detect drag start
    document.addEventListener('mousedown', handleMouseDown);
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMoveGlobal);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMoveGlobal);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
    
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isDragging, dragStart, isVinylExtracted, isFlipped]);

  // Calculate perspective transformation
  const rotateX = (mousePosition.y - 0.5) * 15;
  const rotateY = (mousePosition.x - 0.5) * -15;
  const translateX = (mousePosition.x - 0.5) * 30;
  const translateY = (mousePosition.y - 0.5) * 30;



  return (
    <div className="App">
      <MouseTracker onMouseMove={handleMouseMove} />
      
      {/* EP Visualizer Container */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          perspective: '1200px',
          perspectiveOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
          overflow: 'hidden',
          zIndex: -1,
          backgroundColor: isVinylExtracted ? '#f5f5f5' : '#1a1a1a',
          transition: 'background-color 0.8s ease'
        }}
      >
        {/* Album Cover Container */}
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
              rotateX(${rotateX}deg) 
              rotateY(${rotateY}deg)
              ${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}
              ${isVinylExtracted ? 'translateX(-200%) scale(0.8)' : 'translateX(0%)'}
            `,
            transition: isAnimating || isVinylExtracted ? 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.1s ease-out',
            cursor: !isVinylExtracted ? 'grab' : 'default',
            opacity: isVinylExtracted ? 0.3 : 1,
            zIndex: 3
          }}
        >
          {/* Album Front Cover */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              backgroundImage: `url(${afxFront})`,
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
          
          {/* Album Back Cover */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              backgroundImage: `url(${afxBack})`,
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

        {/* Vinyl Record Container */}
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
                ? `translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isVinylFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}`
                : `translateX(${vinylPosition}%)`
              }
            `,
            transition: isVinylAnimating || isVinylExtracted ? 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.1s ease-out',
            opacity: vinylPosition > 0 ? 1 : 0,
            zIndex: 2,
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
              backgroundImage: `url(${afxASide})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderRadius: '50%',
              boxShadow: `
                0 25px 50px rgba(0,0,0,0.4),
                inset 0 0 100px rgba(255,255,255,0.1),
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
              backgroundImage: `url(${afxBSide})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderRadius: '50%',
              boxShadow: `
                0 25px 50px rgba(0,0,0,0.4),
                inset 0 0 100px rgba(255,255,255,0.1),
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

        {/* Enhanced ambient lighting effects */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: isVinylExtracted 
              ? `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(0,0,0,0.05) 0%, transparent 50%)`
              : `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
            pointerEvents: 'none'
          }}
        />

        {/* Dynamic light rays */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `conic-gradient(from ${mousePosition.x * 360}deg at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              transparent 0deg,
              ${isVinylExtracted ? 'rgba(255,215,0,0.03)' : 'rgba(255,255,255,0.02)'} 30deg,
              transparent 60deg,
              ${isVinylExtracted ? 'rgba(255,215,0,0.03)' : 'rgba(255,255,255,0.02)'} 90deg,
              transparent 120deg,
              ${isVinylExtracted ? 'rgba(255,215,0,0.03)' : 'rgba(255,255,255,0.02)'} 150deg,
              transparent 180deg)`,
            pointerEvents: 'none',
            opacity: 0.6,
            transition: 'background 0.2s ease'
          }}
        />

        {/* Focused spotlight when vinyl is extracted */}
        {isVinylExtracted && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 'min(90vw, 90vh)',
              height: 'min(90vw, 90vh)',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle at center, 
                rgba(255,215,0,0.1) 0%, 
                rgba(255,215,0,0.05) 30%, 
                transparent 60%)`,
              pointerEvents: 'none',
              borderRadius: '50%',
              filter: 'blur(20px)',
              animation: 'pulse 3s ease-in-out infinite'
            }}
          />
        )}
      </div>

      {/* Flip zones indicators (only show when appropriate) */}
      {!isDragging && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '10%',
              height: '100vh',
              background: mousePosition.x <= 0.1 ? 'rgba(255,255,255,0.1)' : 'transparent',
              transition: 'background 0.3s ease',
              pointerEvents: 'none',
              zIndex: 10,
              borderRight: mousePosition.x <= 0.1 ? `1px solid ${isVinylExtracted ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'}` : 'none'
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '10%',
              height: '100vh',
              background: mousePosition.x >= 0.9 ? 'rgba(255,255,255,0.1)' : 'transparent',
              transition: 'background 0.3s ease',
              pointerEvents: 'none',
              zIndex: 10,
              borderLeft: mousePosition.x >= 0.9 ? `1px solid ${isVinylExtracted ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'}` : 'none'
            }}
          />
        </>
      )}

      {/* Content overlay */}
      <div style={{ 
        position: 'relative',
        padding: '20px', 
        color: isVinylExtracted ? '#333' : 'white', 
        minHeight: '100vh',
        zIndex: 1,
        transition: 'all 0.8s ease'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 4rem)', 
          marginBottom: '1rem',
          textShadow: isVinylExtracted ? '2px 2px 8px rgba(255,255,255,0.8)' : '2px 2px 8px rgba(0,0,0,0.8)',
          fontWeight: '300',
          letterSpacing: '2px'
        }}>
          AFX Selected Ambient Works
        </h1>
        <p style={{ 
          fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
          textShadow: isVinylExtracted ? '1px 1px 4px rgba(255,255,255,0.8)' : '1px 1px 4px rgba(0,0,0,0.8)',
          marginBottom: '2rem',
          opacity: 0.9
        }}>
          Interactive EP Visualizer
        </p>
        


        <div style={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          fontSize: '0.8rem',
          opacity: 0.6,
          textAlign: 'right',
          lineHeight: '1.6'
        }}>
          {!isVinylExtracted ? (
            <>
              <div>◄ Flip Zone</div>
              <div style={{ margin: '1rem 0' }}>Drag to extract →</div>
              <div>Flip Zone ►</div>
            </>
          ) : (
            <>
              <div>◄ Flip Vinyl</div>
              <div style={{ margin: '1rem 0' }}>← Drag to store</div>
              <div>Flip Vinyl ►</div>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

export default App; 