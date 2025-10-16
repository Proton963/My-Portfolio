import React from 'react';
import LevelwiseRag from '../assets/Levelwise_RAG(2).png';
import Project2 from '../assets/project2.jpg';
import Project3 from '../assets/project3.jpg';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Levelwise RAG Chatbot",
      description: "A RBAC chatbot application built with Python, Streamlit and MongoDB. Features include user authentication, role-based access control, and widget for file uploads.",
      image: LevelwiseRag,
      technologies: ["Python", "Streamlit", "MongoDB"],
      github: "https://github.com/Proton963/Levelwise_RAG_Chatbot.git",
      live: "",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A responsive task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
      image: Project2, 
      technologies: ["React", "Firebase", "Material-UI", "React DnD"],
      github: "https://github.com/yourusername/task-manager",
      live: "https://task-manager-demo.netlify.app",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A clean weather application that provides current conditions and forecasts using OpenWeather API with location-based services.",
      image: Project3,
      technologies: ["React", "OpenWeather API", "CSS3", "Chart.js"],
      github: "https://github.com/yourusername/weather-app",
      live: "https://weather-dashboard-demo.netlify.app",
      featured: false
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2>My Projects</h2>
          <p>Here are some of my recent works</p>
        </div>
        
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-icon">
                      GitHub
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-icon">
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="technologies">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-more">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="btn primary">
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
