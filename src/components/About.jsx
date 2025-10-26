import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';
import CharacterImg from '../assets/Character.png';

const About = () => {
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
              I'm an aspiring data scientist who loves turning data into meaningful insights
            </motion.h3>
            
            <motion.p variants={textVariants}>
              With a Bachelor's degree in Artificial Intelligence and Data Science 
              (Honors in Cybersecurity), I'm currently pursuing a Data Science internship where 
              I apply my skills in Python, AI, and analytics to solve real-world challenges. 
              I enjoy exploring how intelligent systems can make technology smarter and more 
              human-centered.
            </motion.p>
            
            <motion.p variants={textVariants}>
              When I'm not analyzing data, you'll find me singing, drawing, 
              or diving into new tech trends — always driven by curiosity and 
              a desire to keep learning and creating.
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
