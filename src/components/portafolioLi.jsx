export function PortafolioLi({ nameSection, asection }) {
  return (
    <li className="list-none">
      <a
        href={asection}
        className="px-4 py-2 rounded-full text-gray-700 hover:text-white hover:bg-[#0A2D2E] transition-all duration-300 font-medium tracking-wide"
      >
        {nameSection}
      </a>
    </li>
  );
}

