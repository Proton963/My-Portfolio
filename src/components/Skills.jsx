import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Skills.css';

const Skills = () => {
  const skillCategories = [
    { title: "Frontend" },
    { title: "Backend" },
    { title: "Tools & Others" }
  ];

  const logos = {
    Frontend: [
       { 
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", 
        alt: "HTML5",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
      },
      { 
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", 
        alt: "CSS3",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
      },
      { 
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
        alt: "JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
      },
      { 
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", 
        alt: "React",
        url: "https://react.dev/"
      }
    ],
    Backend: [
      { 
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", 
        alt: "Python",
        url: "https://www.python.org/"
      },
      { 
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", 
        alt: "SQL",
        url: "https://www.mysql.com/"
      },
      { 
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", 
        alt: "MongoDB",
        url: "https://www.mongodb.com/"
      },
      { 
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", 
        alt: "Node.js",
        url: "https://nodejs.org/"
      }
    ],
    "Tools & Others": [
      { 
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", 
        alt: "Git",
        url: "https://git-scm.com/"
      },
      { 
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", 
        alt: "GitHub", 
        cls: "tint-github",
        url: "https://github.com/"
      },
      { 
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", 
        alt: "AWS", 
        cls: "aws-logo",
        url: "https://aws.amazon.com/"
      },
      { 
        src: "https://cdn.simpleicons.org/streamlit/FF4B4B", 
        alt: "Streamlit", 
        cls: "streamlit-logo",
        url: "https://streamlit.io/"
      }
    ]
  };

  const colorClasses = ['color-blue', 'color-green', 'color-orange'];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 variants={headingVariants}>My Skills</motion.h2>
          <motion.p 
            variants={headingVariants}
            transition={{ delay: 0.2 }}
          >
            Technologies I work with
          </motion.p>
        </motion.div>

        <motion.div 
          className="skills-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          {skillCategories.map((category, index) => {
            const title = category.title;
            const logosFor = logos[title];

            return (
              <motion.div
                key={index}
                className={`skill-category ${colorClasses[index % colorClasses.length]}`}
                variants={cardVariants}
              >
                <h3>{title}</h3>

                {logosFor ? (
                  <motion.div 
                    className="tech-logos" 
                    aria-hidden={false}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={containerVariants}
                  >
                    {logosFor.map((logo, i) => (
                      <motion.a
                        href={logo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tech-logo" 
                        key={i}
                        variants={logoVariants}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        aria-label={`Visit ${logo.alt} website`}
                      >
                        <img src={logo.src} alt={logo.alt} className={logo.cls || ''} />
                      </motion.a>
                    ))}
                  </motion.div>
                ) : (
                  <div className="skill-list" style={{ marginTop: 'auto' }}>
                    <p style={{ color: 'inherit' }}>No items</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
