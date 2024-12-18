import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-bgLight text-dark">
      <div className="text-xl font-bold">GreenBlog</div>

      <button
        onClick={toggleMenu}
        className="p-2 focus:outline-none bg- rounded-md"
      >
        ☰
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-bgLight text-dark transform transition-transform duration-300 z-10 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 left-4 text-dark"
        >
          ✕
        </button>
        <ul className="mt-20 p-4 space-y-4">
          <li>
            <a href="/" className="block hover:text-gray-400">
              Mes posts
            </a>
          </li>
          <li>
            <a href="/about" className="block hover:text-gray-400">
              Nouveau Post
            </a>
          </li>
          <li>
            <a href="/contact" className="block hover:text-gray-400">
              Se déconnecter
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-0"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
