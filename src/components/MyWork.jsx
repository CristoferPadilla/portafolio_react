import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

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
    <div className="relative w-full h-auto group overflow-hidden rounded-lg shadow-lg">
      <img
        src={images[currentIndex]}
        alt={`${projectName} image ${currentIndex + 1}`}
        className="w-full h-auto object-cover cursor-pointer transition-opacity duration-500"
        loading="lazy"
        onClick={() => openModal(images[currentIndex])}
      />
      {images.length > 1 && (
        <>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
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
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            &#10094;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            }}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
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
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Mis Proyectos</h2>
        <div className="space-y-16">
          {myWork.map((project, index) => (
            <div key={index} className={`md:flex gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="md:w-1/2">
                <ProjectCarousel 
                  images={project.images} 
                  projectName={project.name} 
                  openModal={openModal} 
                />
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0">
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">{project.name}</h3>
                <p className="text-gray-600 mb-6">{project.description}</p>
                <div className="flex items-center mb-6">
                  <span className="text-sm font-semibold text-gray-500 mr-4">{project.year}</span>
                  <div className="flex flex-wrap gap-2">
                    {project.type.map((t, i) => (
                      <span key={i} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">{t}</span>
                    ))}
                  </div>
                </div>
                {/* <a href="#" className="inline-block bg-sky-800 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors duration-300 shadow-md">
                  Ver proyecto
                </a> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={selectedImage}
              alt="Project image"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
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
