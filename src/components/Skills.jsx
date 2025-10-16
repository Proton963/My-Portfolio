import React from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const skillCategories = [
    { title: "Frontend" },
    { title: "Backend" },
    { title: "Tools & Others" }
  ];

  const logos = {
    Frontend: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML5" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS3" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" }
    ],
    Backend: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "SQL" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" }
    ],
    "Tools & Others": [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git" },
      // make GitHub visible on dark bg by tinting it via CSS class
      { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg", alt: "GitHub", cls: "tint-github" },
      // use raw githubusercontent path for AWS (fixes some CDN issues)
      { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg", alt: "AWS" },
      // tint Streamlit to a distinct color via CSS class
      { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/streamlit.svg", alt: "Streamlit", cls: "tint-streamlit" }
    ]
  };

  const colorClasses = ['color-blue', 'color-green', 'color-orange'];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <h2>My Skills</h2>
          <p>Technologies I work with</p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => {
            const title = category.title;
            const logosFor = logos[title];

            return (
              <div
                key={index}
                className={`skill-category ${colorClasses[index % colorClasses.length]}`}
              >
                <h3>{title}</h3>

                {logosFor ? (
                  <div className="tech-logos" aria-hidden={false}>
                    {logosFor.map((logo, i) => (
                      <div className="tech-logo" key={i}>
                        <img src={logo.src} alt={logo.alt} className={logo.cls || ''} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="skill-list" style={{ marginTop: 'auto' }}>
                    <p style={{ color: 'inherit' }}>No items</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
