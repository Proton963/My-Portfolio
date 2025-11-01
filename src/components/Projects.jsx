import React, { useEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Project.css';
import Levelwise from '../assets/levelwise.png';
import Portfolio from '../assets/portfolio.png';
import AthenaBot from '../assets/athenabot.png';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef([]);
  const headingRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const projects = [
    {
      id: 1,
      title: "Levelwise RAG Chatbot",
      tagline: "Intelligent Conversations",
      description: "A RBAC chatbot application built with Python, Streamlit and MongoDB. Features include user authentication, role-based access control, and widget for file uploads. Uses advanced RAG (Retrieval-Augmented Generation) for context-aware responses.",
      image: Levelwise,
      technologies: ["Python", "Streamlit", "MongoDB", "LangChain"],
      github: "https://github.com/Proton963/Levelwise_RAG_Chatbot.git",
      live: ""
    },
    {
      id: 2,
      title: "My Portfolio Website",
      tagline: "Showcasing My Work",
      description: "My Portfolio Website is a personal project that highlights my skills, experiences, and projects. Built with React Vite, it features a modern design, smooth animations, and a responsive layout.",
      image: Portfolio,
      technologies: ["React Vite", "JS", "CSS", "GSAP"],
      github: "https://github.com/Proton963/My-Portfolio.git",
      live: "href = #"
    },
    {
      id: 3,
      title: "Athena RAG-Bot",
      tagline: "Converts NLP queries to SQL",
      description: "Athena RAG-Bot is a powerful tool that transforms natural language queries into SQL commands. Built with Python and Streamlit, it leverages advanced NLP techniques to understand user intent and generate accurate SQL queries.",
      image: AthenaBot,
      technologies: ["Python", "Groq", "Streamlit"],
      github: "https://github.com/Proton963/Athena_Assist_Bot.git",
      live: "https://proton-athena-bot.streamlit.app/"
    }
  ];

  useEffect(() => {
    // Animate heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Animate projects
    projectsRef.current.forEach((projectElement, index) => {
      if (!projectElement) return;

      // Detect if mobile/tablet
      const isMobile = window.innerWidth <= 768;
      const startPoint = isMobile ? 'top 99%' : 'top 85%';

      const image = projectElement.querySelector('.project-image');
      const contentElements = projectElement.querySelectorAll('.project-content > *');

      // Fade in content with better trigger point
      gsap.fromTo(
        contentElements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: projectElement,
            start: startPoint,
            end: 'top 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Parallax effect for image
      if (image) {
        gsap.to(image, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: projectElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id ="projects" className="projects-showcase">
      <h2 className="projects-heading" ref={headingRef}>My Projects</h2>
      <p className='subHeading'>Ideas turned into reality</p>
      
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="project-panel"
          ref={(el) => (projectsRef.current[index] = el)}
        >
          <div className="project-container">
            {/* Left Column - Single Image */}
            <div className="project-visuals">
              <div className="project-image">
                <img src={project.image} alt={`${project.title} screenshot`} />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="project-content-wrapper">
              <div className="project-content">
                <h1 className="project-title">{project.title}</h1>
                <h3 className="project-tagline">{project.tagline}</h3>
                <p className="project-description">
                  {project.description}
                </p>
                <div className="tech-stack">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-actions">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn icon-btn"
                      aria-label="GitHub Repository"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn icon-btn"
                      aria-label="Live Demo"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                    </a>
                  )}
                  <a className="action-btn pill-btn" onClick={() => setSelectedProject(project)}>
                    Know More...
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedProject.title}</h3>
              <button onClick={() => setSelectedProject(null)}>✕</button>
            </div>
            <p>{selectedProject.description}</p>
          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;
