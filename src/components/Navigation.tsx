
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="glass-effect fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">BlogHub</Link>
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/blogs" className="nav-link">Blogs</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
