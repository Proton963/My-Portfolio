import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TransitionOrb from './TransitionOrb';
import '../styles/About.css';

const About = () => {
  const { scrollYProgress } = useScroll();
  
  // Change heading color when orb reaches it (around 0.6-0.7 scroll progress)
  const headingColor = useTransform(
    scrollYProgress, 
    [0.24, 0.25], 
    ['#ffffff', '#1052a4']
  );
  
  const headingGlow = useTransform(
    scrollYProgress,
    [0.20, 0.25],
    ['none', '0 0 40px #1052a4, 0 0 40px #1052a4']
  );

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <motion.h2 className="about-heading"
            style={{ 
              // color: headingColor,
              textShadow: headingGlow 
            }}
          >
            About Me
          </motion.h2>
          {/* <p>Get to know me better</p> */}
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <h3>I'm a passionate developer who loves creating digital solutions</h3>
            <p>
              With over 3 years of experience in web development, I specialize in 
              creating modern, responsive applications using React, Node.js, and other 
              cutting-edge technologies.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open source projects, or sharing my knowledge through 
              blog posts and tutorials.
            </p>
            
            <div className="personal-info">
              <div className="info-item">
                <strong>Location:</strong> Your City, Country
              </div>
              <div className="info-item">
                <strong>Email:</strong> your.email@example.com
              </div>
              <div className="info-item">
                <strong>Languages:</strong> English, Hindi
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <img src="/assets/about-photo.jpg" alt="About me" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
