import { useEffect } from "react";
import { PortafolioLi } from "../components/portafolioLi";
import { InfoSection } from "../components/sectionInfo";
import { AbilitysList } from "../components/abilitysList";
import { descriptionProfile, myAbilities, myProjects } from "../data/data";
import {MyWork} from "../components/experienceSection";


export function Portafolio() {
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector(".portafolio-header");
            if (window.scrollY > 10) {
                header.classList.add("fade-out");
            } else {
                header.classList.remove("fade-out");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section className="portafolio-container">
            <header className="portafolio-header">
                <nav className="portafolio-nav">
                    <h1 className="portafolio-title">Bienvenido a mi portafolio</h1>
                    <ul className="portafolio-ul">
                        <PortafolioLi nameSection="Habilidades" asection="#about" />
                        <PortafolioLi nameSection="Proyectos" asection="#projects" />
                        <PortafolioLi nameSection="Contacto" asection="#contact" />
                    </ul>
                </nav>
            </header>        

            <main className="portafolio-main">
                <InfoSection descriptionProfile={descriptionProfile[0].descriptionSection} info={descriptionProfile[0].info} info2={descriptionProfile[0].info2} />
                <AbilitysList abilities={myAbilities} />
                <MyWork myWork={myProjects}/>
            </main>
            <footer className="portafolio-footer">
                <p>© Cristofer Padilla 2023</p>
            </footer>
        </section>
    );
}

