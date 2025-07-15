import React, { useState, useEffect } from 'react';
import MouseTracker from './components/MouseTracker';
import afxFront from './assets/afx_selected8582_front.jpg';
import afxBack from './assets/afx_selected8582_back.jpg';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseMove = (position) => {
    setMousePosition(position);
    
    // Check if cursor is near lateral borders (within 10% of screen width)
    const borderThreshold = 0.1;
    const shouldFlip = position.x <= borderThreshold || position.x >= (1 - borderThreshold);
    
    if (shouldFlip && !isFlipped && !isAnimating) {
      // Flip to back
      setIsAnimating(true);
      setIsFlipped(true);
    } else if (!shouldFlip && isFlipped && !isAnimating) {
      // Flip back to front
      setIsAnimating(true);
      setIsFlipped(false);
    }
  };

  // Handle animation end
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600); // Match CSS animation duration
      
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Calculate perspective transformation based on mouse position
  const rotateX = (mousePosition.y - 0.5) * 15; // Reduced for more subtle effect
  const rotateY = (mousePosition.x - 0.5) * -15;
  
  // Calculate translation for parallax effect
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
          backgroundColor: '#1a1a1a'
        }}
      >
        {/* Flip Card Container */}
        <div
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
            `,
            transition: isAnimating ? 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.1s ease-out',
          }}
        >
          {/* Front Cover */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              backgroundImage: `url(${afxFront})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '8px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.1)'
            }}
          />
          
          {/* Back Cover */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              backgroundImage: `url(${afxBack})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '8px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.1)'
            }}
          />
        </div>

        {/* Ambient lighting effects */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Flip zones indicators */}
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
          borderRight: mousePosition.x <= 0.1 ? '1px solid rgba(255,255,255,0.3)' : 'none'
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
          borderLeft: mousePosition.x >= 0.9 ? '1px solid rgba(255,255,255,0.3)' : 'none'
        }}
      />

      {/* Content overlay */}
      <div style={{ 
        position: 'relative',
        padding: '20px', 
        color: 'white', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
        backdropFilter: 'blur(2px)',
        zIndex: 1
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 4rem)', 
          marginBottom: '1rem',
          textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
          fontWeight: '300',
          letterSpacing: '2px'
        }}>
          AFX Selected Ambient Works
        </h1>
        <p style={{ 
          fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
          textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
          marginBottom: '2rem',
          opacity: 0.9
        }}>
          Interactive EP Visualizer
        </p>
        
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          padding: '1rem',
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: '12px',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            {isFlipped ? '🔄 Back Cover' : '🎵 Front Cover'}
          </div>
          <div>Move cursor to left/right edges to flip</div>
          <div style={{ marginTop: '0.5rem', opacity: 0.7 }}>
            Mouse: {mousePosition.x.toFixed(3)}, {mousePosition.y.toFixed(3)}
          </div>
          <div style={{ opacity: 0.7 }}>
            Rotation: {rotateY.toFixed(1)}°, {rotateX.toFixed(1)}°
          </div>
        </div>

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
          <div>◄ Flip Zone</div>
          <div style={{ margin: '1rem 0' }}>Move mouse to edges</div>
          <div>Flip Zone ►</div>
        </div>
      </div>
    </div>
  );
}

export default App; 