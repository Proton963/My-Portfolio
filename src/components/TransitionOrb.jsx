import React, { useEffect, useRef, useState } from 'react';
import '../styles/TransitionOrb.css';

export default function TransitionOrb() {
  const orbRef = useRef(null);
  const [aboutCollision, setAboutCollision] = useState(false);
  const [skillsGlowIntensity, setSkillsGlowIntensity] = useState(0);
  const [projectsGlowIntensity, setProjectsGlowIntensity] = useState(0);
  const [contactGlowIntensity, setContactGlowIntensity] = useState(0);
  const [orbGlowIntensity, setOrbGlowIntensity] = useState(0);

  const [styles, setStyles] = useState({
    scale: 1,
    y: 0,
    opacity: 1,
  });

  useEffect(() => {
    function handleScroll() {
      const GLOW_FAR = 150;
      const GLOW_NEAR = 100;

      const aboutHeading = document.querySelector('.about-heading');
      const skillsHeading = document.querySelector('#skills h2');
      const projectsHeading = document.querySelector('#projects h2');
      const contactHeading = document.querySelector('#contact h2');
      const orb = orbRef.current;

      if (!aboutHeading || !skillsHeading || !projectsHeading || !contactHeading || !orb) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get all heading rects and centers ONCE at the top
      const aboutRect = aboutHeading.getBoundingClientRect();
      const aboutTopFromTop = aboutRect.top + scrollY;
      const aboutCenterY = aboutRect.top + aboutRect.height / 2;

      const skillsRect = skillsHeading.getBoundingClientRect();
      const skillsTopFromTop = skillsRect.top + scrollY;
      const skillsCenterY = skillsRect.top + skillsRect.height / 2;

      const projectsRect = projectsHeading.getBoundingClientRect();
      const projectsTopFromTop = projectsRect.top + scrollY;
      const projectsCenterY = projectsRect.top + projectsRect.height / 2;

      const contactRect = contactHeading.getBoundingClientRect();
      const contactTopFromTop = contactRect.top + scrollY;
      const contactCenterY = contactRect.top + contactRect.height / 2;

      // ABOUT SECTION MOTION
      const aboutEndScroll = aboutTopFromTop - windowHeight * 0.2;
      const aboutProgress = Math.max(0, Math.min(scrollY / Math.max(1, aboutEndScroll), 1));

      let scale = 1 - aboutProgress * 0.97;
      const targetY = aboutTopFromTop - windowHeight * 0.75;
      let y = aboutProgress * targetY;
      let opacity = 1;

      const aboutPassedMiddle = aboutRect.top < windowHeight * 0.3;
      if (aboutPassedMiddle && aboutProgress > 0.85) {
        const fadeStart = 0.85;
        opacity = 1 - (aboutProgress - fadeStart) / (1 - fadeStart);
      }

      // SKILLS SECTION APPROACH
      const fadeInStart = aboutTopFromTop + windowHeight * 0.1;
      const skillsEndScroll = skillsTopFromTop - windowHeight * 0.2;
      const skillsFadeInEnd = skillsTopFromTop - windowHeight * 0.1;

      if (scrollY > fadeInStart && scrollY < skillsEndScroll) {
        const skillsProgress = (scrollY - fadeInStart) / Math.max(1, (skillsEndScroll - fadeInStart));
        scale = 0.03 + skillsProgress * 0.10;
        const eased = 1 - Math.pow(1 - skillsProgress, 2);
        opacity = Math.min(1, eased);
        y = targetY + eased * (skillsTopFromTop - aboutTopFromTop) * 0.001;
      }

      const skillsPassedMiddle = skillsRect.top < windowHeight * 0.3;
      if (skillsPassedMiddle && scrollY > skillsEndScroll) {
        opacity = 0;
      }

      // PROJECTS SECTION APPROACH
      const projectsFadeInStart = skillsTopFromTop + windowHeight * 0.3;
      const projectsEndScroll = projectsTopFromTop - windowHeight * 0.2;
      const projectsFadeInEnd = projectsTopFromTop - windowHeight * 0.1;

      if (scrollY > projectsFadeInStart && scrollY < projectsEndScroll) {
        const projectsProgress = (scrollY - projectsFadeInStart) / Math.max(1, (projectsEndScroll - projectsFadeInStart));
        scale = 0.03 + projectsProgress * 0.10;
        const eased = 1 - Math.pow(1 - projectsProgress, 2);
        opacity = Math.min(1, eased);
        y = targetY + eased * (projectsTopFromTop - aboutTopFromTop) * 0.001;
      }

      // const projectsPassedMiddle = projectsRect.top < windowHeight * 0.3;
      // if (projectsPassedMiddle && scrollY > projectsEndScroll) {
      //   opacity = 0;
      // }

      // CONTACT SECTION APPROACH
      const contactFadeInStart = projectsTopFromTop + windowHeight * 0.3;
      const contactEndScroll = contactTopFromTop - windowHeight * 0.2;

      if (scrollY > contactFadeInStart && scrollY < contactEndScroll) {
        const contactProgress = (scrollY - contactFadeInStart) / Math.max(1, (contactEndScroll - contactFadeInStart));
        scale = 0.03 + contactProgress * 0.10;
        const eased = 1 - Math.pow(1 - contactProgress, 2);
        opacity = Math.min(1, eased);
        y = targetY + eased * (contactTopFromTop - aboutTopFromTop) * 0.001;
      }

      const contactPassedMiddle = contactRect.top < windowHeight * 0.3;
      if (contactPassedMiddle && scrollY > contactEndScroll) {
        opacity = 0;
      }

      // COLLISION DETECTION
      const orbRect = orb.getBoundingClientRect();
      const orbCenterY = orbRect.top + orbRect.height / 2;

      const skillsDistance = Math.abs(orbCenterY - skillsCenterY);
      const projectsDistance = Math.abs(orbCenterY - projectsCenterY);
      const contactDistance = Math.abs(orbCenterY - contactCenterY);
      const aboutDistance = Math.abs(orbCenterY - aboutCenterY);

      const aboutHit = aboutDistance < 100;

      // Compute per-heading base glow based on proximity
      const calcRawGlow = (distance) => {
        if (distance > GLOW_FAR) return 0;
        const raw = (GLOW_FAR - distance) / (GLOW_FAR - GLOW_NEAR);
        return Math.max(0, Math.min(1, raw * raw));
      };

      let skillsRawGlow = calcRawGlow(skillsDistance);
      let projectsRawGlow = calcRawGlow(projectsDistance);
      let contactRawGlow = calcRawGlow(contactDistance);

      // Apply distance-based glow logic for all sections
      let finalSkillsGlow = 0;
      let finalProjectsGlow = 0;
      let finalContactGlow = 0;

      // Skills glow only when orb is near
      if (orbCenterY < projectsCenterY) {
        finalSkillsGlow = skillsRawGlow;
      }

      // Projects glow only when orb is near and between skills and contact
      if (orbCenterY > skillsCenterY && orbCenterY < contactCenterY) {
        finalProjectsGlow = projectsRawGlow;
      }

      // Contact glow only when orb is near and past projects
      if (orbCenterY > projectsCenterY) {
        finalContactGlow = contactRawGlow;
      }

      // Set states
      setStyles({ scale, y, opacity });
      setAboutCollision(aboutHit);
      setSkillsGlowIntensity(finalSkillsGlow);
      setProjectsGlowIntensity(finalProjectsGlow);
      setContactGlowIntensity(finalContactGlow);
      setOrbGlowIntensity(0); // No orb glow in this simplified approach
    }

    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // About heading glow
  useEffect(() => {
    const aboutHeading = document.querySelector('.about-heading');
    if (!aboutHeading) return;
    aboutHeading.style.transition = 'text-shadow 0.3s ease-out';
    aboutHeading.style.textShadow = aboutCollision
      ? '0 0 40px #114b93, 0 0 60px #114b93, 0 0 80px #114b93'
      : 'none';
  }, [aboutCollision]);

  // Skills heading glow with intensity
  useEffect(() => {
    const skillsHeading = document.querySelector('#skills h2');
    if (!skillsHeading) return;
    skillsHeading.style.transition = 'text-shadow 0.3s ease-out';
    if (skillsGlowIntensity > 0) {
      const blur1 = 40 * skillsGlowIntensity;
      const blur2 = 60 * skillsGlowIntensity;
      const blur3 = 80 * skillsGlowIntensity;
      skillsHeading.style.textShadow = `
        0 0 ${blur1}px rgba(17, 75, 147, ${skillsGlowIntensity}),
        0 0 ${blur2}px rgba(17, 75, 147, ${skillsGlowIntensity * 0.8}),
        0 0 ${blur3}px rgba(17, 75, 147, ${skillsGlowIntensity * 0.6})
      `;
    } else {
      skillsHeading.style.textShadow = 'none';
    }
  }, [skillsGlowIntensity]);

  // Projects heading glow with intensity
  useEffect(() => {
    const projectsHeading = document.querySelector('#projects h2');
    if (!projectsHeading) return;
    projectsHeading.style.transition = 'text-shadow 0.3s ease-out';
    if (projectsGlowIntensity > 0) {
      const blur1 = 40 * projectsGlowIntensity;
      const blur2 = 60 * projectsGlowIntensity;
      const blur3 = 80 * projectsGlowIntensity;
      projectsHeading.style.textShadow = `
        0 0 ${blur1}px rgba(17, 75, 147, ${projectsGlowIntensity}),
        0 0 ${blur2}px rgba(17, 75, 147, ${projectsGlowIntensity * 0.8}),
        0 0 ${blur3}px rgba(17, 75, 147, ${projectsGlowIntensity * 0.6})
      `;
    } else {
      projectsHeading.style.textShadow = 'none';
    }
  }, [projectsGlowIntensity]);

  // Contact heading glow with intensity
  useEffect(() => {
    const contactHeading = document.querySelector('#contact h2');
    if (!contactHeading) return;
    contactHeading.style.transition = 'text-shadow 0.3s ease-out';
    if (contactGlowIntensity > 0) {
      const blur1 = 40 * contactGlowIntensity;
      const blur2 = 60 * contactGlowIntensity;
      const blur3 = 80 * contactGlowIntensity;
      contactHeading.style.textShadow = `
        0 0 ${blur1}px rgba(17, 75, 147, ${contactGlowIntensity}),
        0 0 ${blur2}px rgba(17, 75, 147, ${contactGlowIntensity * 0.8}),
        0 0 ${blur3}px rgba(17, 75, 147, ${contactGlowIntensity * 0.6})
      `;
    } else {
      contactHeading.style.textShadow = 'none';
    }
  }, [contactGlowIntensity]);

  // Orb glow styling
  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;
    orb.style.transition = 'box-shadow 120ms linear, transform 120ms linear, opacity 120ms linear';
    if (orbGlowIntensity > 0) {
      const glow = orbGlowIntensity;
      const blur1 = 30 * glow;
      const blur2 = 60 * glow;
      orb.style.boxShadow = `
        0 0 ${blur1}px rgba(17,75,147,${0.9 * glow}),
        0 0 ${blur2}px rgba(17,75,147,${0.55 * glow})
      `;
    } else {
      orb.style.boxShadow = 'none';
    }
  }, [orbGlowIntensity]);

  return (
    <div
      ref={orbRef}
      className="transition-orb"
      style={{
        transform: `translateY(${styles.y}px) scale(${styles.scale})`,
        opacity: styles.opacity,
      }}
    />
  );
}
