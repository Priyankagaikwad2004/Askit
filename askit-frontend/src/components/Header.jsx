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
          <div className="relative">
            <FiCompass className="text-yellow-500 text-2xl mr-2 transform group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 bg-yellow-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
          <h1 className="text-xl font-bold text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">
            Explore India
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <button
            onClick={() => handleProtectedClick("/search")}
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-all duration-300 hover:scale-105 py-2"
          >
            <FiHome className="mr-1" />
            <span>Home</span>
          </button>
          <button
            onClick={() => handleProtectedClick("/itinerary")}
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-all duration-300 hover:scale-105 py-2"
          >
            <FiCompass className="mr-1" />
            <span>Plan Your Trip</span>
          </button>
          <button
            onClick={() => handleProtectedClick("/add-place")}
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-all duration-300 hover:scale-105 py-2"
          >
            <span className="mr-1">➕</span>
            <span>Add Place</span>
          </button>
          <button
            onClick={() => handleProtectedClick("/search")}
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-all duration-300 hover:scale-105 py-2"
          >
            <FiUser className="mr-1" />
            <span>About</span>
          </button>
          {token && (
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-red-500 transition-all duration-300 py-2"
            >
              <FiLogOut className="mr-1" />
              <span>Logout</span>
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full p-2 transition-all duration-300 hover:bg-yellow-50"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FiX className="w-6 h-6 transform transition-transform duration-300 rotate-90" />
          ) : (
            <FiMenu className="w-6 h-6 transform transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <button onClick={() => handleProtectedClick("/search")} className="text-left py-2 border-b">
              Home
            </button>
            <button onClick={() => handleProtectedClick("/itinerary")} className="text-left py-2 border-b">
              Plan Your Trip
            </button>
            <button onClick={() => handleProtectedClick("/add-place")} className="text-left py-2 border-b">
              Add Place
            </button>
            <button onClick={() => handleProtectedClick("/search")} className="text-left py-2 border-b">
              About
            </button>
            {token && (
              <button onClick={handleLogout} className="text-left py-2 text-red-500">
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
