import React from 'react';
import Spline from '@splinetool/react-spline';
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>👋 I'm Pratham</h1>
        <h2 className="hero-text-h2">
        Flutter Developer + 
        <br /> UI/UX Designer
        </h2>
        <p>
          Welcome to my digital playground! <br />
          Software developer by day, UI/UX developer by night.
        </p>
        {/* Add your CTA buttons or social icons here */}
      </div>
      <div className="hero-spline">
        <Spline scene="https://prod.spline.design/PydBbNZIJCACt9Lu/scene.splinecode" />
      </div>
    </section>
  );
}
