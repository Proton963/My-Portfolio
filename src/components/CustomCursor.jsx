import React, { useEffect, useState } from 'react';
import '../styles/CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moveCursor = e => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  // Animate ring to follow the dot with delay
  useEffect(() => {
    let animationFrame;

    const follow = () => {
      setRingPosition(prev => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrame = requestAnimationFrame(follow);
    };
    animationFrame = requestAnimationFrame(follow);

    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  return (
    <>
      <div
        className="cursor-dot"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className="cursor-ring"
        style={{ left: `${ringPosition.x}px`, top: `${ringPosition.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
