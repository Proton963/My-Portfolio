import React, { useEffect, useRef, useState } from 'react';
import '../styles/TransitionOrb.css';

export default function TransitionOrb() {
  const orbRef = useRef(null);

  const [aboutCollision, setAboutCollision] = useState(false);
  const [skillsGlowIntensity, setSkillsGlowIntensity] = useState(0);
  const [hasSkillsGlowTriggered, setHasSkillsGlowTriggered] = useState(false);

  const [styles, setStyles] = useState({
    scale: 1,
    y: 0,
    opacity: 1,
  });

  useEffect(() => {
    function handleScroll() {
      const aboutHeading = document.querySelector('.about-heading');
      const skillsHeading = document.querySelector('#skills h2');
      const orb = orbRef.current;
      if (!aboutHeading || !skillsHeading || !orb) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // ABOUT SECTION MOTION
      const aboutRect = aboutHeading.getBoundingClientRect();
      const aboutTopFromTop = aboutRect.top + scrollY;
      const aboutEndScroll = aboutTopFromTop - windowHeight * 0.2;
      const aboutProgress = Math.max(0, Math.min(scrollY / aboutEndScroll, 1));

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
      const skillsRect = skillsHeading.getBoundingClientRect();
      const skillsTopFromTop = skillsRect.top + scrollY;

      const fadeInStart = aboutTopFromTop + windowHeight * 0.1;
      const fadeInEnd = skillsTopFromTop - windowHeight * 0.4;

      if (scrollY > fadeInStart && scrollY < fadeInEnd) {
        const skillProgress = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
        scale = 0.03 + skillProgress * 0.12;
        const eased = 1 - Math.pow(1 - skillProgress, 2);
        opacity = Math.min(1, eased);
        y = targetY + eased * (skillsTopFromTop - aboutTopFromTop) * 0.5;
      }

      // COLLISION DETECTION
      const orbRect = orb.getBoundingClientRect();
      const orbCenterY = orbRect.top + orbRect.height / 2;

      // About heading
      const aboutCenterY = aboutRect.top + aboutRect.height / 2;
      const aboutDistance = Math.abs(orbCenterY - aboutCenterY);
      const aboutHit = aboutDistance < 100;

      // Skills heading - progressive glow
      const skillsCenterY = skillsRect.top + skillsRect.height / 2;
      const skillsDistance = Math.abs(orbCenterY - skillsCenterY);

      // Map distance 200→50 to intensity 0→1
      const GLOW_FAR = 200;
      const GLOW_NEAR = 50;
      let glowIntensity = 0;

      if (skillsDistance < GLOW_FAR) {
        const rawIntensity = Math.max(0, Math.min(1, 
          (GLOW_FAR - skillsDistance) / (GLOW_FAR - GLOW_NEAR)
        ));
        // Ease-in quad for smooth ramp-up
        glowIntensity = rawIntensity * rawIntensity;
      }

      // Latch logic: once glow reaches ~80% intensity, lock it on
      if (glowIntensity > 0.8 && !hasSkillsGlowTriggered) {
        setHasSkillsGlowTriggered(true);
      } else if (scrollY < fadeInStart && hasSkillsGlowTriggered) {
        // Reset if scrolled back before transition zone
        setHasSkillsGlowTriggered(false);
      }

      // After latch triggers, keep glow at full while heading is visible
      const skillsHeadingIsOnScreen =
        skillsRect.top < windowHeight && skillsRect.bottom > 0;

      if (hasSkillsGlowTriggered && skillsHeadingIsOnScreen) {
        glowIntensity = 1;
      }

      const orbHasPassedSkills = orbCenterY > skillsCenterY;
      if (scrollY > fadeInStart && orbHasPassedSkills) {
        opacity = 0;
      }

      setStyles({ scale, y, opacity });
      setAboutCollision(aboutHit);
      setSkillsGlowIntensity(glowIntensity);
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
  }, [hasSkillsGlowTriggered]);

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

    // Remove CSS transition; we're animating via state changes at frame rate
    skillsHeading.style.transition = 'none';

    if (skillsGlowIntensity > 0) {
      const strength = skillsGlowIntensity * 100; // 0-100%
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

  return (
    <div
      ref={orbRef}
      className="transition-orb"
      aria-hidden
      style={{
        transform: `translate3d(0, ${styles.y}px, 0) scale(${styles.scale})`,
        opacity: styles.opacity,
      }}
    />
  );
}
