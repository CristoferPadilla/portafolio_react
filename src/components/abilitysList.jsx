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
              <li key={index} className="relative">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={ability.icon}
                    alt={`${ability.name} icon`}
                    className="w-16 h-16 object-contain"
                    loading="lazy"
                  />
                  <p className="text-white mt-2 text-base">
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
