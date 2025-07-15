import React, { useState, useEffect } from 'react';
import './MouseTracker.css';

const MouseTracker = ({ onMouseMove }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      
      // Normalize coordinates to 0-1 range
      const normalizedX = x / window.innerWidth;
      const normalizedY = y / window.innerHeight;
      
      setMousePosition({ x, y });
      setNormalizedPosition({ x: normalizedX, y: normalizedY });
      
      // Pass the normalized position to parent component
      if (onMouseMove) {
        onMouseMove({ x: normalizedX, y: normalizedY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onMouseMove]);

  return (
    <div className="mouse-tracker">
      {/* Horizontal line */}
      <div 
        className="horizontal-line"
        style={{ top: `${mousePosition.y}px` }}
      >
        <span className="coordinate-label">
          Y: {normalizedPosition.y.toFixed(3)}
        </span>
      </div>
      
      {/* Vertical line */}
      <div 
        className="vertical-line"
        style={{ left: `${mousePosition.x}px` }}
      >
        <span className="coordinate-label">
          X: {normalizedPosition.x.toFixed(3)}
        </span>
      </div>
    </div>
  );
};

export default MouseTracker; 