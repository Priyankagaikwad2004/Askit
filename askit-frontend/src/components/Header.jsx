import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiCompass, FiHeart, FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <FiCompass className="text-yellow-500 text-2xl mr-2" />
          <h1 className="text-xl font-bold text-gray-800">Explore India</h1>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="flex items-center text-gray-600 hover:text-yellow-500 transition-colors">
            <FiHome className="mr-1" /> Home
          </Link>
          <Link to="/destinations" className="flex items-center text-gray-600 hover:text-yellow-500 transition-colors">
            <FiCompass className="mr-1" /> Destinations
          </Link>
          <Link to="/favorites" className="flex items-center text-gray-600 hover:text-yellow-500 transition-colors">
            <FiHeart className="mr-1" /> Favorites
          </Link>
          <Link to="/about" className="flex items-center text-gray-600 hover:text-yellow-500 transition-colors">
            <FiUser className="mr-1" /> About
          </Link>
        </nav>
        <button className="md:hidden text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;