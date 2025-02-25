import { Link } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="glass-effect fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-center text-2xl ml-2 font-bold text-primary">
          BlogHub
        </Link>
        <h1 className="hidden md:block text-sm text-gray-600">
          Enjoy the art of reading news around the world
        </h1>

        {/* Hamburger Menu (Visible on Mobile) */}
        <button
          className="md:hidden block text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/postgrid" className="nav-link">Posts</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </div>

      {/* Mobile Menu (Toggles) */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 bg-white shadow-md p-4">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/postgrid" className="nav-link">Posts</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
