import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <CustomCursor />
    </div>
  );
}

export default App;
