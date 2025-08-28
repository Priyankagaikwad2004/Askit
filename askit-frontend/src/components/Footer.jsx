import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-yellow-400 mr-2">✈</span>
              Explore India
            </h3>
            <p className="text-gray-400">
              Discover the rich cultural heritage and breathtaking landscapes of India.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">Home</Link></li>
              <li><Link to="/destinations" className="text-gray-400 hover:text-yellow-400 transition-colors">Destinations</Link></li>
              <li><Link to="/favorites" className="text-gray-400 hover:text-yellow-400 transition-colors">Favorites</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>info@exploreindia.com</li>
              <li>+91 9876543210</li>
              <li>123 Travel Street, Mumbai</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <FiInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <FiFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <FiYoutube className="text-xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Explore India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;