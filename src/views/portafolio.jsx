import { useNavigate, useParams } from "react-router-dom";
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
    const { userId } = useParams(); // Get userId from the URL (if any)
    const [isCommunityView, setIsCommunityView] = useState(false);

    // Get logged-in user's ID
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    useEffect(() => {
        // Determine if it's a community view or a personal view
        if (userId && userId !== loggedInUserId) { // Check if it's a different user
            setIsCommunityView(true);
        } else {
            setIsCommunityView(false);
        }

        const fetchPortfolioData = async () => {
            let targetUserId = loggedInUserId; // Default to logged-in user
            if (userId && userId !== loggedInUserId) {
                targetUserId = userId; // If viewing from community, use the userId from the URL
            }
                if (!targetUserId) {
                  navigate('/portafolio_react/');
                  return;
                }
            const portfolios = JSON.parse(localStorage.getItem('portfolios')) || {};
            const userPortfolio = portfolios[targetUserId];

            if (userPortfolio) {
                setPortfolioData(userPortfolio);
                setHasPortfolio(true);
            } else {
                setHasPortfolio(false);
            }
        };

        fetchPortfolioData();
    }, [loggedInUserId, navigate, userId]);

    const handleCreatePortfolioClick = () => {
        navigate('/portafolio_react/form'); // Navigate to the FORM component!
    };
    const handleGoBack = () => {
        navigate("/portafolio_react/home");
    }
    const handleEditPortfolioClick = () => {
        navigate('/portafolio_react/form', { state: { portfolioData } });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 200) {
                setCurrentSection(0);
            } else if (scrollPosition >= 200 && scrollPosition < 500) {
                setCurrentSection(1);
            } else if (scrollPosition >= 500) {
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

    if (!hasPortfolio && !isCommunityView) {
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
                  {/*Back-Button*/}
                      <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 text-gray-600 cursor-pointer hover:text-gray-800 transition"
          title="Regresar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
          {/*Back-Button*/}
          
          
          <ul className="portafolio-ul">
            <PortafolioLi nameSection="Habilidades" asection="#myAbilities" />
            <PortafolioLi nameSection="Proyectos" asection="#myWork" />
             {/* Conditionally render Edit button */}
             {!isCommunityView && (
                 <PortafolioLi
                     nameSection="Edit"
                     asection=""
                     onClick={handleEditPortfolioClick}
                     className="portafolio-li"
                 />
             )}
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
          <InfoSection
            fullName={portfolioData?.full_name}
             urlCv={portfolioData?.cv_file}
            descriptionProfile={portfolioData?.description} />
        </motion.div>

        <motion.div
          key="abilities"
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <AbilitysList abilities={portfolioData?.programming_languages} />
        </motion.div>

        <motion.div
          key="work"
          initial={{ opacity: 0, y: 50 }}
          animate={currentSection === 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <MyWork myWork={portfolioData?.projects} />
        </motion.div>
      </main>

      <ContactFooter />
    </section>
  );
}