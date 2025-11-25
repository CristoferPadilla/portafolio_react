import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { PortafolioLi } from "../components/portafolioLi";
import { InfoSection } from "../components/sectionInfo";
import { AbilitysList } from "../components/abilitysList";
import { MyWork } from "../components/MyWork";
import { ExperienceSection } from "../components/experienceSection";
import { ContactFooter } from "../components/contactFooter";
import { descriptionProfile, myAbilities, myProjects, myExperiences } from "../data/data";

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
    
    // Run once to set initial section on load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="portafolio-container">
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
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <InfoSection descriptionProfile={descriptionProfile[0].descriptionSection} />  
        </motion.div>

        <motion.div
          ref={abilitiesRef}
          key="abilities"
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          id="myAbilities"
        >
          <AbilitysList abilities={myAbilities} /> 
        </motion.div>

        <motion.div
          ref={workRef}
          key="work"
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          id="myWork"
        >
          <MyWork myWork={myProjects} /> 
        </motion.div>

        <motion.div
          ref={experienceRef}
          key="experience"
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          id="myExperience"
        >
          <ExperienceSection experiences={myExperiences} /> 
        </motion.div>
      </main>

      <ContactFooter />
    </section>
  );
}
