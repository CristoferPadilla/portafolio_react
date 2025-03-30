import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faHome,
  faClipboardList,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export function Navbar() {
    const navigate = useNavigate();
    const [loggedInUserId, setLoggedInUserId] = useState(localStorage.getItem('loggedInUserId'));

    useEffect(() => {
        // Update loggedInUserId when it changes in localStorage
        const handleStorageChange = () => {
            setLoggedInUserId(localStorage.getItem('loggedInUserId'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleHomeClick = () => {
        navigate("/portafolio_react/home");
    };

    const handleMyPortfolioClick = () => {
        navigate(`/portafolio_react/home/${loggedInUserId}`);
    };
    const handleLogoutClick = () => {
        localStorage.removeItem('loggedInUserId');
         localStorage.removeItem('accessToken');
        navigate("/portafolio_react/");
    };

    return (
        <div className="flex flex-col w-20 bg-white shadow-md">
            <div className="flex items-center justify-center h-16 ">
                <FontAwesomeIcon icon={faCompass} size="lg" className="text-gray-700"  />
            </div>

            <nav className="flex flex-col flex-grow p-2">
                <button
                    onClick={handleHomeClick}
                    className="block py-3 text-gray-700 cursor-pointer hover:text-gray-900 hover:bg-gray-100 rounded-lg text-center"
                >
                    <FontAwesomeIcon icon={faHome} size="lg" />
                </button>
                {/*         <a
                    href="/portafolio_react/form"
                    className="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-center"
                >
                    <FontAwesomeIcon icon={faChartBar} size="lg" />
                </a> */}
              {loggedInUserId && (
                  <a
                      href={`/portafolio_react/home/${loggedInUserId}`}
                      className="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-center"
                  >
                      <FontAwesomeIcon icon={faClipboardList} size="lg" />
                  </a>
              )}
            </nav>

            <div className="p-2 flex items-center justify-center">
                <button
                    onClick={handleLogoutClick}
                    className="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full text-center"
                >
                    <FontAwesomeIcon icon={faUserCircle} size="lg" />
                </button>
            </div>
        </div>
    );
}