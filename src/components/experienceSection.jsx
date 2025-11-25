import PropTypes from 'prop-types';

export function ExperienceSection({ experiences }) {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Experiencia Laboral</h2>
        <div className="space-y-6">
          {experiences && experiences.length > 0 ? (
            experiences.map(({ company, role, dateRange, details }, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-700">{role} | {company}</h3>
                <p className="text-gray-500 italic mb-2">{dateRange}</p>
                <ul className="list-disc list-inside text-gray-600">
                  {details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center">No experience found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

ExperienceSection.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      dateRange: PropTypes.string.isRequired,
      details: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};
