import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Typewriter = ({ texts, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(text.substring(0, currentText.length + 1));
        if (currentText.length === text.length) {
          setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
        }
      } else {
        setCurrentText(text.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? delay / 2 : delay);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts, delay]);

  return <span>{currentText}<span className="animate-pulse">|</span></span>;
};

export function InfoSection({ descriptionProfile }) {
  const [showCvModal, setShowCvModal] = useState(false);
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowCvModal(false);
      }
    };

    if (showCvModal) {
      setIsLoadingIframe(true);
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-hide-cursor');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.removeAttribute('data-hide-cursor');
    };
  }, [showCvModal]);

  return (
    <article className="info-container">
      <div className="info-div" style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
        <h2 className="info-title text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:h-24">
          Hola, Soy Cristofer Padilla<br />
          <span className="text-teal-700 mt-2 block">
            <Typewriter texts={['Desarrollador Front End', 'Desarrollador Móvil', 'Desarrollador Web']} />
          </span>
        </h2>

        <p className="info-description text-gray-600 leading-relaxed mt-6">
          {descriptionProfile}
        </p>

        {/* Botones */}
        <div className="flex flex-wrap gap-4 mt-8">
          {/* Descargar CV (Primary) */}
          <a
            href="https://drive.google.com/uc?export=download&id=1DidEAxlv0oMmzDMhOqW6v7Nl3Zx6xHkm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0A2D2E] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0d3b3c] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Descargar CV
          </a>

          {/* Ver CV (Secondary - abre Modal Preview) */}
          <button
            type="button"
            onClick={() => setShowCvModal(true)}
            className="flex items-center gap-2 border-2 border-[#0A2D2E] text-[#0A2D2E] bg-transparent px-6 py-3 rounded-full font-medium hover:bg-[#0A2D2E] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            Ver CV
          </button>
        </div>

        {/* Redes Sociales */}
        {/* <div className="flex justify-center gap-6 mt-8">
          <a href="https://github.com/CristoferPadilla" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0A2D2E] hover:-translate-y-1 hover:scale-110 transition-all duration-300">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0A2D2E] hover:-translate-y-1 hover:scale-110 transition-all duration-300">
             <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div> */}
      </div>

      <aside className="image-container relative z-10 group">
        <div className="Circulo relative transition-transform duration-500 group-hover:scale-105">
          <div className="absolute inset-0 bg-[#0A2D2E] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
          <img src="/h.jpg" alt="Foto de perfil" className="relative z-10" style={{ border: '4px solid #0A2D2E' }} />
        </div>
      </aside>

      {/* Modal de Vista Previa del CV */}
      <AnimatePresence>
        {showCvModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCvModal(false)}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
            >
              {/* Header del Modal */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#0A2D2E] text-white">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <h3 className="text-lg md:text-xl font-bold text-white">Vista previa de mi CV</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowCvModal(false)}
                    className="text-gray-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Cerrar vista previa"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Contenido del iFrame */}
              <div
                className="flex-1 w-full bg-gray-100 relative"
                onMouseEnter={() => document.body.setAttribute('data-hide-cursor', 'true')}
                onMouseLeave={() => document.body.removeAttribute('data-hide-cursor')}
              >
                {isLoadingIframe && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10 pointer-events-none">
                    <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-gray-700 font-medium text-sm">Cargando vista previa...</p>
                  </div>
                )}
                <iframe
                  src="https://drive.google.com/file/d/1DidEAxlv0oMmzDMhOqW6v7Nl3Zx6xHkm/preview"
                  className="w-full h-full border-0"
                  title="Vista Previa Curriculum Vitae"
                  allow="autoplay"
                  onLoad={() => setIsLoadingIframe(false)}
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
