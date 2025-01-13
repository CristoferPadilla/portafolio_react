import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <h2 className="info-title">Contáctame</h2>
      <p className="info-description">
        Envíame un mensaje si te interesó mi perfil y me pondré en contacto
        contigo.
      </p>
      <article className="contact-container">
        <div className="contact-info">
          <ul className="contact-list">
            <li className="contact-item">
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ marginRight: "5px" }}
              />{" "}
              Correo:{" "}
              <a
                className="contact-link"
                href="mailto:cristpferpadilla0406@gmail.com"
              >
                cristpferpadilla0406@gmail.com
              </a>
            </li>
            <li className="contact-item">
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: "5px" }} />{" "}
              Telefonos:{" "}
              <a className="contact-link" href="tel:+529991782213">
                +52 9991782213
              </a>
            </li>
            <li className="contact-item">
              <FontAwesomeIcon icon={faGithub} style={{ marginRight: "5px" }} />{" "}
              GitHub:{" "}
              <a
                className="contact-link"
                href="https://github.com/CristoferPadilla"
              >
                CristoferPadilla
              </a>
            </li>
            <li className="contact-item">
              <FontAwesomeIcon
                icon={faLinkedin}
                style={{ marginRight: "5px" }}
              />{" "}
              LinkedIn:{" "}
              <a
                className="contact-link"
                href="https://www.linkedin.com/in/cristofer-enrique-padilla-calder%C3%B3n-166428294/"
              >
                Cristofer Enrique Padilla Calderón
              </a>
            </li>
            <li className="contact-item">
              <FontAwesomeIcon
                icon={faFileAlt}
                style={{ marginRight: "5px" }}
              />{" "}
              CV:{" "}
              <a
                className="contact-link"
                href="https://drive.google.com/file/d/1x9_wv1YR_ST-1jlvL7wYvmN5dnuE8ziE/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mirar CV
              </a>
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
}
