import React, { useEffect, useState } from 'react';
import '../styles/LoadingScreen.css';

const greetings = ["Hello!", "नमस्ते !"];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);

  // Animate progress from 0 to 100 over 4 seconds
  useEffect(() => {
    let start = null;
    const duration = 4000;

    function animate(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percentage = Math.min(elapsed / duration * 100, 100);
      setProgress(percentage);
      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, []);

  // Toggle greeting text every 2000ms
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex(i => 1 - i); // toggle between 0 and 1
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="greeting">{greetings[greetingIndex]}</div>
      <div className="progress-bar">
        <div className="progress-fill" style={{width: `${progress}%`}} />
      </div>
    </div>
  );
}
