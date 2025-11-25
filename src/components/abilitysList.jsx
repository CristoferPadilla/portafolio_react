import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../css/abilitysList.css';

export function AbilitysList({ abilities }) {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.setAttribute("data-animated", "true");

      const scrollerInner = scroller.querySelector(".scroller__inner");
      if (scrollerInner.children.length === abilities.length) {
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    }
  }, [abilities]);

  if (!abilities || abilities.length === 0) {
    return <p className="text-white text-center">No abilities found.</p>;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Habilidades Técnicas</h2>
        <div className="scroller" ref={scrollerRef} data-speed="slow" data-direction="left">
          <ul className="tag-list scroller__inner">
            {abilities.map((ability, index) => (
              <li key={index} className="relative group">
                <div className="flex flex-col items-center justify-center h-full">
                  <img
                    src={ability.icon}
                    alt={`${ability.name} icon`}
                    className="w-16 h-16 object-contain"
                    loading="lazy"
                  />
                  <p className="text-white mt-2 text-base">{ability.name}</p>
                </div>
                <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {ability.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-4 border-t-black border-l-4 border-l-transparent border-r-4 border-r-transparent"></div>
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
