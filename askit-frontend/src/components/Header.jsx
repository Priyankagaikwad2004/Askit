import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiCompass, FiHeart, FiUser, FiX, FiMenu } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 hover:shadow-xl">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center group"
          onClick={closeMenu}
        >
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
          <Link 
            to="/search" 
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-all duration-300 hover:scale-105 py-2"
          >
            <FiHome className="mr-1 transform hover:scale-110 transition-transform" /> 
            <span className="font-medium">Home</span>
          </Link>
          <Link 
            to="/search" 
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-all duration-300 hover:scale-105 py-2"
          >
            <FiCompass className="mr-1 transform hover:scale-110 transition-transform" /> 
            <span className="font-medium">Destinations</span>
          </Link>
          <Link 
            to="/add-place" 
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-all duration-300 hover:scale-105 py-2"
          >
            <span className="mr-1 transform hover:scale-110 transition-transform">➕</span> 
            <span className="font-medium">Add Place</span>
          </Link>
          <Link 
            to="/search" 
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-all duration-300 hover:scale-105 py-2"
          >
            <FiUser className="mr-1 transform hover:scale-110 transition-transform" /> 
            <span className="font-medium">About</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full p-2 transition-all duration-300 hover:bg-yellow-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <FiX className="w-6 h-6 transform transition-transform duration-300 rotate-90" />
          ) : (
            <FiMenu className="w-6 h-6 transform transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white shadow-lg transform origin-top transition-all duration-300 ease-in-out ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 max-h-0'}`}>
        <nav className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          <Link 
            to="/search" 
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-all duration-300 py-3 border-b border-gray-100"
            onClick={closeMenu}
          >
            <FiHome className="mr-3 text-lg" /> 
            <span className="font-medium">Home</span>
          </Link>
          <Link 
            to="/search" 
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-all duration-300 py-3 border-b border-gray-100"
            onClick={closeMenu}
          >
            <FiCompass className="mr-3 text-lg" /> 
            <span className="font-medium">Destinations</span>
          </Link>
          <Link 
            to="/add-place" 
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-all duration-300 py-3 border-b border-gray-100"
            onClick={closeMenu}
          >
            <span className="mr-3 text-lg">➕</span> 
            <span className="font-medium">Add Place</span>
          </Link>
          <Link 
            to="/search" 
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-all duration-300 py-3"
            onClick={closeMenu}
          >
            <FiUser className="mr-3 text-lg" /> 
            <span className="font-medium">About</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;