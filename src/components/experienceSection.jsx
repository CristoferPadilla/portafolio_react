import React, { useState } from "react";

export function MyWork({ myWork }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState("");

  const openModal = (image) => {
    setExpandedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false); // Al hacer clic en el fondo, se cierra el modal
  };

  return (
    <article className="my-work-container"  id="myWork">
      <h1 className="info-title">Mis proyectos</h1>
      <span className="info-description">
        Algunos de los proyectos que he realizado a lo largo de mi carrera
        profesional.
      </span>
      <br />
      <br />
      <div className="my-work-list-wrapper">
        {myWork.map(({ name, description, image }) => (
          <div className="my-work-list-container" key={name}>
            <img
              className="my-work-image"
              src={image}
              alt={name}
              loading="lazy"
              onClick={() => openModal(image)} // Al hacer clic, se abre el modal con la imagen
            />
            <strong className="my-work-name">{name}</strong>
            <span className="my-work-description">{description}</span>
          </div>
        ))}
      </div>
      {/* Modal para mostrar la imagen expandida */}
      {isOpen && (
        <div
          className={`modal-overlay ${isOpen ? "open" : "close"}`}
          onClick={closeModal} // Cerrar modal al hacer clic en el fondo
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={expandedImage}
              alt="Imagen Expandida"
              className="expanded-image"
            />
          </div>
        </div>
      )}
    </article>
  );
}
