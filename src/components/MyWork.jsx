import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProjectCarousel = ({ images, projectName, openModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-auto group overflow-hidden rounded-xl shadow-xl transition-shadow hover:shadow-2xl hover:shadow-teal-500/20">
      <img
        src={images[currentIndex]}
        alt={`${projectName} image ${currentIndex + 1}`}
        className="w-full h-auto object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onClick={() => openModal(images[currentIndex])}
      />
      {images.length > 1 && (
        <>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-teal-400 w-6" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            }}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-teal-600 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
          >
            &#10094;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            }}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-teal-600 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  );
};

ProjectCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectName: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export function MyWork({ myWork }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!myWork || myWork.length === 0) {
    return <p className="text-gray-700 text-center">No projects found.</p>;
  }

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-20 relative">
          Mis Proyectos
          <span className="block w-24 h-1 bg-teal-500 mx-auto mt-4 rounded-full"></span>
        </h2>
        
        <div className="space-y-24">
          {myWork.map((project, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`md:flex gap-12 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className="md:w-1/2 relative group">
                <ProjectCarousel 
                  images={project.images} 
                  projectName={project.name} 
                  openModal={openModal} 
                />
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <h3 className="text-3xl font-bold text-gray-800 mb-4 hover:text-teal-600 transition-colors">{project.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{project.description}</p>
                <div className="flex items-center mb-8">
                  <span className="text-sm font-bold text-teal-600 mr-4 bg-teal-50 px-3 py-1 rounded-full">{project.year}</span>
                  <div className="flex flex-wrap gap-2">
                    {project.type.map((t, i) => (
                      <span key={i} className="bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">{t}</span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0A2D2E] text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      Ver Demo
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-gray-800 hover:text-gray-900 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      Código
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity" onClick={closeModal}>
          <div className="relative max-w-5xl max-h-full">
            <img
              src={selectedImage}
              alt="Project image"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute -top-4 -right-4 text-white text-2xl bg-teal-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-teal-500 shadow-lg transition-transform hover:scale-110"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

MyWork.propTypes = {
  myWork: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string),
      year: PropTypes.string,
      type: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};
