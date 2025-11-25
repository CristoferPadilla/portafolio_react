import PropTypes from 'prop-types';

export function MyWork({ myWork }) {
  if (!myWork || myWork.length === 0) {
    return <p className="text-gray-700 text-center">No projects found.</p>;
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">Mis Proyectos</h2>
        <div className="space-y-16">
          {myWork.map((project, index) => (
            <div key={index} className={`md:flex gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="md:w-1/2">
                <img
                  src={project.image}
                  alt={`${project.name} image`}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  loading="lazy"
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
    </section>
  );
}

MyWork.propTypes = {
  myWork: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string,
      year: PropTypes.string,
      type: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};
