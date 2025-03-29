import { useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PortafolioLi } from "../components/portafolioLi";
import { InfoSection } from "../components/sectionInfo";
import { AbilitysList } from "../components/abilitysList";
import { MyWork } from "../components/experienceSection";
import { ContactFooter } from "../components/contactFooter";
import { Navbar } from "../components/navbar";

export function Portafolio() {
  const [hasPortfolio, setHasPortfolio] = useState(null); 
  const [portfolioData, setPortfolioData] = useState(null);
    const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0); 

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('https://apiport.onrender.com/portfolio/${id}', { 
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPortfolioData(data);
          setHasPortfolio(true);
        } else if (response.status === 404) {
          // Portfolio not found
          setHasPortfolio(false);
        } else {
          // Handle other errors
          console.error("Error fetching portfolio:", response.status);
          setHasPortfolio(false);
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setHasPortfolio(false); 
      }
    };

    fetchPortfolioData();
  }, []);

  const handleCreatePortfolioClick = () => {
       navigate('/portafolio_react/form'); 
    };

useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < 300) {
      setCurrentSection(0);
    } else if (scrollPosition >= 300 && scrollPosition < 900) {
      setCurrentSection(1);
    } else if (scrollPosition >= 900) {
      setCurrentSection(2);
    }
  };

  if (hasPortfolio) {
    window.addEventListener('scroll', handleScroll);
  }

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [hasPortfolio]);

if (hasPortfolio === null) {
  return <div>Loading...</div>; 
}

if (!hasPortfolio) {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100">
      <div className="flex flex-col md:flex-row bg-gray-100">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 flex-grow">
        <p className="text-2xl text-gray-700 mb-4">
          You don&apos;t have a portfolio yet.
        </p>
        <button
          className="bg-[#064E3B] hover:bg-[#06583a] text-white font-bold py-2 px-4 rounded-full cursor-pointer focus:outline-none focus:shadow-outline"
          onClick={handleCreatePortfolioClick}
        >
          Create a Portfolio
        </button>
      </div>
    </div>
  );
}

  return (
    <section className="portafolio-container">
      <header className="portafolio-header">
        <nav className="portafolio-nav">
          <ul className="portafolio-ul">
            <PortafolioLi nameSection="Habilidades" asection="#myAbilities" />
            <PortafolioLi nameSection="Proyectos" asection="#myWork" />
          </ul>
        </nav>
      </header>

      <main className="portafolio-main">
        <motion.div
          key="info"
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <InfoSection descriptionProfile={portfolioData.description} />  
        </motion.div>

        <motion.div
          key="abilities"
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <AbilitysList abilities={portfolioData.abilities} /> 
        </motion.div>

        <motion.div
          key="work"
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <MyWork myWork={portfolioData.projects} /> 
        </motion.div>
      </main>

      <ContactFooter />
    </section>
  );
}