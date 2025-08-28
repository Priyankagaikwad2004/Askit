import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;