import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Spline from '@splinetool/react-spline';
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>
            <span role="img" aria-label="waving hand">👋</span>{' '}
            <Typewriter
                words={["I'm Pratham"]}
                typeSpeed={90}          // slower for dramatic effect
                delaySpeed={600}        // begin typing slowly
                cursor
                cursorStyle="_"
            />
        </h1>
        <h2 className="hero-text-h2">
            Python Developer <span className="plus-nowrap"> + </span><br />
        </h2>
        <h2 className="hero-text-h2">AI Enthusiast</h2>
        <p>
          Welcome to my digital playground! <br />
          Software developer by day, AI enthusiast by night.
        </p>
        <div className="hero-socials">
            <a 
                className="btn-resume" 
                href="https://drive.google.com/file/d/1sRxUxVcoAw2wkLNfukmOIWHu3KhSOoeV/view?usp=sharing" 
                download 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Resume"
             >
                <i className="fas fa-download"></i> Resume
            </a>
            <a className="social-btn" href="https://github.com/Proton963" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
            </a>
            <a className="social-btn" href="https://www.linkedin.com/in/pratham-nagvekar-393406280/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
            </a>
        </div>

      </div>
      <div className="hero-spline">
        <Spline scene="https://prod.spline.design/PydBbNZIJCACt9Lu/scene.splinecode" />
      </div>
    </section>
  );
}
