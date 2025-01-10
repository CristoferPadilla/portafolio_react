import { useEffect } from "react";
import { PortafolioLi } from "../components/portafolioLi";
import { InfoSection } from "../components/sectionInfo";
import { AbilitysList } from "../components/abilitysList";

const descriptionProfile = [
    {
        descriptionSection: `¡Hola! Soy Cristofer. Técnico Superior Universitario en Desarrollo de Software
          Multiplataforma. Apasionado en el desarrollo Móvil, con experiencia en
          desarrollo Móvil con Flutter y en desarrollo Web con React y Vue. Soy originario de Mérida, Yucatán, tengo
          21 años, actualmente vivo en Mérida, centro, soy una persona seria,
          responsable, se trabajar en equipo y bajo presión, adaptable a cualquier
          entorno laboral.`,
        info: "Educación: Universidad Técnologica Metropolitana",  
        info2: "Framework que más me gusta: Flutter"
    }
]

const myAbilities = [
    {
        name: "Flutter",
        description: "Para desarrollo de aplicaciones Móviles",
        icon: "/icons8-aleteo.svg",
        years: "1 año y 6 meses"
    },
    {
        name: "React Native",
        description: "Para desarrollo de aplicaciones Móviles",
        icon: "/icons8-reaccionar-nativo.svg",
        years: "2 meses"
    },
    {
        name: "React",
        description: "Para desarrollo de aplicaciones Web",
        icon: "/react.svg",
        years: "4 meses"
    },
    {
        name: "Vue",
        description: "Para desarrollo de aplicaciones Web",
        icon: "/icons8-ver-js.svg",
        years: "6 meses"
    },
    {
        name: "JavaScript",
        description: "Para desarrollo de aplicaciones Web",
        icon: "/public/icons8-javascript.svg",
        years: "1 año y 4 meses"
    },
    {
        name: "C#",
        description: "Para desarrollo de aplicaciones",
        icon: "/icons8-c.svg",
        years: "1 año"
    }
];

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
            </main>
            <footer className="portafolio-footer">
                <p>© Cristofer Padilla 2023</p>
            </footer>
        </section>
    );
}

