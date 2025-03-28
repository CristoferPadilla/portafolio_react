import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faHome,

  faChartBar,
  faClipboardList,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  return (
    <div className="flex flex-col w-20 bg-white shadow-md">
      <div className="flex items-center justify-center h-16">
        <FontAwesomeIcon icon={faCompass} size="lg" className="text-gray-700" />
      </div>

      <nav className="flex flex-col flex-grow p-2">
        <a
          href="/portafolio_react/home"
          className="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-center"
        >
          <FontAwesomeIcon icon={faHome} size="lg" />
        </a>
        <a
          href="/portafolio_react/portafolio"
          className="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-center"
        >
          <FontAwesomeIcon icon={faClipboardList} size="lg" />
        </a>
        <a
          href="/portafolio_react/form"
          className="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-center"
        >
          <FontAwesomeIcon icon={faChartBar} size="lg" />
        </a>
      </nav>

      <div className="p-2 flex items-center justify-center">
        <a
          href="/portafolio_react/"
          className="block py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full text-center"
        >
          <FontAwesomeIcon icon={faUserCircle} size="lg" />
        </a>
      </div>
    </div>
  );
}
