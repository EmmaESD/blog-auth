import { useState } from "react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Bouton Burger */}
      <button
        onClick={toggleMenu}
        className="p-3 focus:outline-none z-20 fixed top-4 right-4 bg-gray-800 text-white rounded-md"
      >
        ☰
      </button>

      {/* Menu qui slide */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 left-4 text-white"
        >
          ✕
        </button>
        <ul className="mt-20 p-4">
          <li className="mb-4">
            <a href="#home" className="block hover:text-gray-400">
              Accueil
            </a>
          </li>
          <li className="mb-4">
            <a href="#about" className="block hover:text-gray-400">
              À propos
            </a>
          </li>
          <li className="mb-4">
            <a href="#contact" className="block hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Fond semi-transparent pour fermer le menu */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
        ></div>
      )}
    </div>
  );
};

export default Menu;
