import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiCompass, FiUser, FiX, FiMenu, FiLogOut } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleProtectedClick = (path) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 hover:shadow-xl">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group" onClick={closeMenu}>
          <FiCompass className="text-yellow-500 text-2xl mr-2" />
          <h1 className="text-xl font-bold text-gray-800">Explore India</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <button
            onClick={() => handleProtectedClick("/search")}
            className="flex items-center text-gray-700 hover:text-yellow-500"
          >
            <FiHome className="mr-1" />
            <span>Home</span>
          </button>
          <button
            onClick={() => handleProtectedClick("/add-place")}
            className="flex items-center text-gray-700 hover:text-yellow-500"
          >
            <span className="mr-1">➕</span>
            <span>Add Place</span>
          </button>
          <button
            onClick={() => handleProtectedClick("/about")}
            className="flex items-center text-gray-700 hover:text-yellow-500"
          >
            <FiUser className="mr-1" />
            <span>About</span>
          </button>
          {token && (
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-red-500"
            >
              <FiLogOut className="mr-1" />
              <span>Logout</span>
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 p-2"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <button onClick={() => handleProtectedClick("/search")} className="text-left">
              Home
            </button>
            <button onClick={() => handleProtectedClick("/add-place")} className="text-left">
              Add Place
            </button>
            <button onClick={() => handleProtectedClick("/about")} className="text-left">
              About
            </button>
            {token && (
              <button onClick={handleLogout} className="text-left text-red-500">
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
