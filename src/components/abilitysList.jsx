import PropTypes from 'prop-types';

export function AbilitysList({ abilities }) {
  return (
    <section className="bg-[#1C4E4F] py-12">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-white">Skills</h2>
          <a href="#" className="text-gray-300 hover:text-white text-sm">
            Ver todo
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {abilities && abilities.length > 0 ? (
            abilities.map(({ name, description, icon, date, tags }) => (
              <div
                key={name}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {name}
                  </h3>
                  <div className="text-gray-500 text-sm mb-2">
                    {date} | {tags}
                  </div>
                  <p className="text-gray-600 text-sm">{description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center">No abilities found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
