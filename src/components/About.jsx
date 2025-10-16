import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TransitionOrb from './TransitionOrb';
import '../styles/About.css';
import CharacterImg from '../assets/Character.png';

const About = () => {
  const { scrollYProgress } = useScroll();
  
  const headingGlow = useTransform(
    scrollYProgress,
    [0.20, 0.25],
    ['none', '0 0 40px #114b93, 0 0 40px #114b93']
  );

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <motion.h2 className="about-heading"
           style={{ textShadow: headingGlow }}>
            About Me
          </motion.h2>
        </div>
        
        <div className="about-content">
          <div className="about-image">
            <img src={CharacterImg} alt="About me" />
          </div>
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
                <strong>Location:</strong> Thane, India
              </div>
              <div className="info-item">
                <strong>Email:</strong> pratham.d.nagvekar@gmail.com
              </div>
              <div className="info-item">
                <strong>Languages:</strong> English, Hindi, Marathi
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
