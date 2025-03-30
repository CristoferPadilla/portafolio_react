import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';

export function MyWork({ myWork }) {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedImage, setExpandedImage] = useState("");
    const modalRef = useRef(null);

    const openModal = (image) => {
        setExpandedImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <section className="py-8">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Proyectos</h2>
                <div className="grid grid-cols-1 gap-6">
                    {myWork && myWork.length > 0 ? (
                        myWork.map(({ title, description, image_url, year, type_technologies }) => (
                            <div
                                key={title}
                                className="bg-white rounded-lg shadow-md overflow-hidden flex items-start"
                            >
                                <img
                                    className="w-1/3 object-cover cursor-pointer"
                                    src={image_url}  // Use image_url
                                    alt={title}
                                    loading="lazy"
                                    onClick={() => openModal(image_url)}
                                />
                                <div className="p-4 flex-grow">
                                    <h3 className="text-xl font-semibold text-gray-700 mb-1">{title}</h3>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="bg-gray-200 text-gray-600 rounded-full px-3 py-1 text-sm font-semibold">
                                            {year}
                                        </span>
                                        <span className="text-gray-500 text-sm">{type_technologies.join(", ")}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">{description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-700 text-center">No projects found.</p>
                    )}
                </div>
            </div>

            {isOpen && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-lg p-4 max-w-4xl max-h-4xl"
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src={expandedImage} alt="Expanded" className="w-full h-auto object-contain" />
                    </div>
                </div>
            )}
        </section>
    );
}
MyWork.propTypes = {
    myWork: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image_url: PropTypes.string,
        year: PropTypes.number.isRequired,
        type_technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    })),
};