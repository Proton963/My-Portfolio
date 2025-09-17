import React from 'react';
import Spline from '@splinetool/react-spline';
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>👋 I'm Pratham</h1>
        <h2 className="hero-text-h2">Python Developer +</h2>
        <h2 className='hero-text-h2'> AI Enthusiast</h2>
        <p>
          Welcome to my digital playground! <br />
          Software developer by day, AI enthusiast by night.
        </p>
        {/* Add your CTA buttons or social icons here */}
      </div>
      <div className="hero-spline">
        <Spline scene="https://prod.spline.design/PydBbNZIJCACt9Lu/scene.splinecode" />
      </div>
    </section>
  );
}
