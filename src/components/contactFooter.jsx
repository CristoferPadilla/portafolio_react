import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGithub, faLinkedin, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export function ContactFooter() {
  return (
    <footer className="bg-white py-4 flex-col">
      <div className="container mx-auto flex flex-col h-15 items-center">
        {/* Social Media Icons */}
        <div className="flex items-center justify-center space-x-4">
             <a href="#" className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
             <a href="https://github.com/CristoferPadilla" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
             <a href="https://www.linkedin.com/in/cristofer-enrique-padilla-calder%C3%B3n-166428294/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
        </div>

      </div>
              {/* Copyright and Powered By Text */}
              <p className="text-gray-500 text-xs justify-start ">
          Powered By FleTechnologies M.R.
        </p>
    </footer>
  );
}