import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TransitionOrb from './TransitionOrb';
import '../styles/About.css';
import CharacterImg from '../assets/Character.png';

const About = () => {
  const { scrollYProgress } = useScroll();
  
  const headingGlow = useTransform(
    scrollYProgress,
    [0.15, 0.21],
    ['none', '0 0 40px #114b93, 0 0 40px #114b93']
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="about-heading"
            style={{ textShadow: headingGlow }}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h2>
          <p>A brief intro</p>
        </div>
        
        <motion.div 
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.div 
            className="about-image"
            variants={imageVariants}
          >
            <img src={CharacterImg} alt="About me" />
          </motion.div>
          
          <div className="about-text">
            <motion.h3 variants={textVariants}>
              I'm a passionate developer who loves creating digital solutions
            </motion.h3>
            
            <motion.p variants={textVariants}>
              With over 3 years of experience in web development, I specialize in 
              creating modern, responsive applications using React, Node.js, and other 
              cutting-edge technologies.
            </motion.p>
            
            <motion.p variants={textVariants}>
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open source projects, or sharing my knowledge through 
              blog posts and tutorials.
            </motion.p>
            
            <motion.div 
              className="personal-info"
              variants={textVariants}
            >
              <div className="info-item">
                <strong>Location:</strong> Thane, India
              </div>
              <div className="info-item">
                <strong>Email:</strong> pratham.d.nagvekar@gmail.com
              </div>
              <div className="info-item">
                <strong>Languages:</strong> English, Hindi, Marathi
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
