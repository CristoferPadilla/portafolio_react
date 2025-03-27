export function Dashboard() {
    const defaultImage = "https://via.placeholder.com/150"; // Imagen predeterminada

    return (
        <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <img
                        src={defaultImage} // Aquí puedes reemplazar con una lógica para verificar si hay imagen
                        alt="Profile"
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Cristofer Padilla</h2>
                        <p className="text-gray-500 text-sm">8 Vistas, 37 Interacciones</p>
                    </div>
                </div>
                <div>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded">
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-300 mb-4">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-t-lg -mb-px">
                    Properties
                </button>
                <button className="text-gray-500 font-semibold py-2 px-4 rounded-t-lg -mb-px">
                    Sub-tenants
                </button>
                <button className="text-gray-500 font-semibold py-2 px-4 rounded-t-lg -mb-px">
                    Settings
                </button>
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Name</h3>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">Cristofer Padilla</p>
                        <button className="text-blue-500 text-sm">Edit</button>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Location</h3>
                    <div className="flex items-center">
                        <svg
                            className="w-5 h-5 text-gray-500 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <p className="text-gray-600">165 11th Street, San Francisco, CA...</p>
                    </div>
                </div>
            </div>

            {/* Supply Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">ARE YOU AVAILABLE?</h3>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" />
                        <span className="ml-2 text-gray-700">Busy</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" defaultChecked />
                        <span className="ml-2 text-gray-700">Working</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" defaultChecked />
                        <span className="ml-2 text-gray-700">Available</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" />
                        <span className="ml-2 text-gray-700">Not Available</span>
                    </label>
                </div>
            </div>

            {/* Status Dropdown */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Status</h3>
                <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                    <option>Holidays</option>
                    <option>Working</option>
                    <option>Away</option>
                </select>
            </div>

            {/* Update Button */}
            <div>
                <button className="bg-[#0A2D2E] hover:bg-[#3c787a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Update
                </button>
            </div>
        </div>
    );
}