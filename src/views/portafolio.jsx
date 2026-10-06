import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { PortafolioLi } from "../components/portafolioLi";
import { InfoSection } from "../components/sectionInfo";
import { AbilitysList } from "../components/abilitysList";
import { SkillSlotMachine } from "../components/SkillSlotMachine";
import { MyWork } from "../components/MyWork";
import { ExperienceSection } from "../components/experienceSection";
import { ContactFooter } from "../components/contactFooter";
import { descriptionProfile, myAbilities, myProjects, myExperiences } from "../data/data";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      );

      if (document.body.getAttribute('data-hide-cursor') === 'true') {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    const handleMutation = () => {
      setIsHidden(document.body.getAttribute('data-hide-cursor') === 'true');
    };

    const observer = new MutationObserver(handleMutation);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-hide-cursor'] });

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          body:not([data-hide-cursor="true"]) * {
            cursor: none !important;
          }
          body[data-hide-cursor="true"] * {
            cursor: auto !important;
          }
        }
      `}</style>

      {/* Nave Espacial */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center text-teal-600 drop-shadow-[0_0_8px_rgba(20, 184, 166, 0.8)]"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isPointer ? 1.2 : 1,
          rotate: isPointer ? -45 : 0,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill="none" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" fill="none" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" fill="none" />
        </svg>
      </motion.div>

      {/* Rastro de fuego/estrella */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-orange-400 pointer-events-none z-[9998] hidden md:block drop-shadow-[0_0_10px_rgba(251,146,60,1)]"
        animate={{
          x: position.x - 16,
          y: position.y + 12,
          opacity: isHidden ? 0 : (isPointer ? 0.9 : 0.4),
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 0.8 }}
      />
    </>
  );
};

export function Portafolio() {
  const [currentSection, setCurrentSection] = useState(0);
  const infoRef = useRef(null);
  const abilitiesRef = useRef(null);
  const workRef = useRef(null);
  const experienceRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (infoRef.current && abilitiesRef.current && workRef.current && experienceRef.current) {
        const infoTop = infoRef.current.offsetTop;
        const abilitiesTop = abilitiesRef.current.offsetTop;
        const workTop = workRef.current.offsetTop;
        const experienceTop = experienceRef.current.offsetTop;

        if (scrollPosition < abilitiesTop) {
          setCurrentSection(0);
        } else if (scrollPosition >= abilitiesTop && scrollPosition < workTop) {
          setCurrentSection(1);
        } else if (scrollPosition >= workTop && scrollPosition < experienceTop) {
          setCurrentSection(2);
        } else if (scrollPosition >= experienceTop) {
          setCurrentSection(3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="portafolio-container">
      <CustomCursor />
      <header className="portafolio-header">
        <nav className="portafolio-nav">
          <ul className="portafolio-ul">
            <PortafolioLi nameSection="Habilidades" asection="#myAbilities" />
            <PortafolioLi nameSection="Proyectos" asection="#myWork" />
            <PortafolioLi nameSection="Experiencia" asection="#myExperience" />
          </ul>
        </nav>
      </header>

      <main className="portafolio-main">
        <motion.div
          ref={infoRef}
          key="info"
          id="info"
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <InfoSection descriptionProfile={descriptionProfile[0].descriptionSection} />
        </motion.div>

        <motion.div
          ref={abilitiesRef}
          key="abilities"
          id="myAbilities"
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          {/* <AbilitysList abilities={myAbilities} /> */}
          <SkillSlotMachine abilities={myAbilities} />
        </motion.div>

        <motion.div
          ref={workRef}
          key="work"
          id="myWork"
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <MyWork myWork={myProjects} />
        </motion.div>

        <motion.div
          ref={experienceRef}
          key="experience"
          id="myExperience"
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <ExperienceSection experiences={myExperiences} />
        </motion.div>
      </main>

      <ContactFooter />
    </section>
  );
}
