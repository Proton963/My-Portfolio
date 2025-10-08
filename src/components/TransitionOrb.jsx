// src/components/TransitionOrb.jsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/TransitionOrb.css';

export default function TransitionOrb() {
  const { scrollYProgress } = useScroll();

  // Orb shrinks between scroll 0–0.1, then moves down 0.1–0.25, then fades out 0.7–0.8
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.001]);
  const y = useTransform(scrollYProgress, [0.01, 0.20], ['0vh', '70vh']);
  const opacity = useTransform(scrollYProgress, [0.7, 0.8], [1, 0]);

  return (
    <motion.div
      className="transition-orb"
      style={{
        scale,
        y,
        opacity,
        position: 'fixed',
        transform: 'translateX(-500%)',
        // zIndex: 999,
        pointerEvents: 'none'
      }}
    />
  );
}
