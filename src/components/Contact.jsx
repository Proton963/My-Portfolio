import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    alert('Thanks for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>Let's discuss your next project</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a conversation about technology and development.
            </p>
            
            <div className="contact-methods">
              <div className="contact-item">
                <strong>Email:</strong>
                <a href="mailto:your.email@example.com">your.email@example.com</a>
              </div>
              <div className="contact-item">
                <strong>Location:</strong>
                <span>Your City, Country</span>
              </div>
              <div className="contact-item">
                <strong>Phone:</strong>
                <a href="tel:+1234567890">+1 (234) 567-8900</a>
              </div>
            </div>
            
            <div className="social-links">
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
