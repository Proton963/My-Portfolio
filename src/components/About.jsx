import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2>About Me</h2>
          <p>Get to know me better</p>
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
