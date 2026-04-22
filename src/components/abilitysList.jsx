import PropTypes from 'prop-types';
import '../css/abilitysList.css';

export function AbilitysList({ abilities }) {
  if (!abilities || abilities.length === 0) {
    return <p className="text-white text-center">No abilities found.</p>;
  }

  const duplicatedList = [...abilities, ...abilities];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Ya trabajo con estas tecnologías y herramientas
        </h2>

        <div
          className="scroller"
          data-speed="slow"
          data-direction="left"
          data-animated="true"
        >
          <ul className="tag-list scroller__inner">
            {duplicatedList.map((ability, index) => (
              <li key={index} className="relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] cursor-pointer border border-transparent hover:border-teal-500/30">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={ability.icon}
                    alt={`${ability.name} icon`}
                    className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                    loading="lazy"
                  />
                  <p className="text-white mt-3 text-base font-medium group-hover:text-teal-300 transition-colors">
                    {ability.name}
                  </p>
                </div>

                {/* Tooltip */}
                <div className="tooltip">
                  {ability.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

AbilitysList.propTypes = {
  abilities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string,
      date: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
};
