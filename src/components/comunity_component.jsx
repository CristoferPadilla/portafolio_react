import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ComunityLayout() {
    const [portfolios, setPortfolios] = useState([]);
    const [filters, setFilters] = useState({
        programming_languages: '',
        spoken_languages: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all portfolios from localStorage
        const allPortfolios = JSON.parse(localStorage.getItem('portfolios')) || {};
        // Convert object of objects to array of objects, including user IDs
        const portfoliosArray = Object.entries(allPortfolios).map(([userId, portfolio]) => ({
            userId,
            ...portfolio,
        }));
        setPortfolios(portfoliosArray);
    }, []);

    const handleViewPortfolio = (userId) => {
        // Navigate to the specific portfolio using the new route
        navigate(`/portafolio_react/home/${userId}`);
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const filteredPortfolios = portfolios.filter(portfolio => {
        const programmingLanguagesMatch = !filters.programming_languages ||
            (portfolio.programming_languages &&
                portfolio.programming_languages.includes(filters.programming_languages));

        const spokenLanguagesMatch = !filters.spoken_languages ||
            (portfolio.spoken_languages &&
                portfolio.spoken_languages.includes(filters.spoken_languages));

        return programmingLanguagesMatch && spokenLanguagesMatch;
    });

    return (
        <div className="container mx-auto py-8 px-4">
            <header className="flex justify-between items-center mb-8 w-full">
                <h1 className="text-2xl text-gray-800 font-semibold">Comunidad</h1>
            </header>

            {/* Filters */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="programming_languages" className="block text-gray-700 text-sm font-medium mb-2">
                                    Lenguajes de Programación:
                                </label>
                                <input
                                    type="text"
                                    name="programming_languages"
                                    id="programming_languages"
                                    className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Ej: JavaScript"
                                    onChange={handleFilterChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="spoken_languages" className="block text-gray-700 text-sm font-medium mb-2">
                                    Idiomas:
                                </label>
                                <input
                                    type="text"
                                    name="spoken_languages"
                                    id="spoken_languages"
                                    className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Ej: Español"
                                    onChange={handleFilterChange}
                                />
                            </div>
                        </div>

                        <section className="w-full">
                {filteredPortfolios.map((portfolio) => (
                    <div key={portfolio.userId} className="flex flex-col md:flex-row items-center md:items-start mb-12 gap-6 max-w-4xl mx-auto">
                        {/* Circular Avatar */}
                        <div className="w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-gray-200 text-2xl md:text-4xl font-bold uppercase text-gray-600">
                            {portfolio.full_name.charAt(0)}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="text-4xl text-gray-800 mb-2">“{portfolio.full_name}”</div>
                            <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-4">{portfolio.description}</p>
                            <p className="text-gray-800 text-xs md:text-sm font-medium mb-1">{portfolio.full_name}</p>
                            <p className="text-gray-800 text-xs md:text-sm">Lenguajes: {portfolio.programming_languages?.join(', ') || 'N/A'}</p>
                            <button
                                className="bg-green-800 hover:bg-green-700 text-white text-xs py-2 px-4 rounded mt-4 inline-flex items-center space-x-2"
                                onClick={() => handleViewPortfolio(portfolio.userId)} // Pass userId
                            >
                                <span>Ver más</span>
                            </button>

                            {/* Carousel indicators */}
                            <div className="mt-4 flex items-center">
                                <div className="w-40 h-0.5 bg-gray-200 rounded flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-green-800 ml-1/4"></div>
                                </div>
                                <div className="flex space-x-1 ml-2">
                                    <span className="w-2 h-2 rounded-full bg-green-800"></span>
                                    <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                                    <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}