import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  FiSearch, 
  FiMapPin, 
  FiInfo, 
  FiSun, 
  FiClock, 
  FiDollarSign,
  FiHome,
  FiCompass,
  FiHeart,
  FiUser,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiStar,
  FiCalendar,
  FiCamera,
  FiArrowRight // Add this to your existing imports
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Add these components before the SearchPlace component definition

const EnhancedSection = ({ title, content, icon }) => (
  <div className="mb-12">
    <h3 className="text-2xl font-bold mb-4 flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </h3>
    <p className="text-gray-700 leading-relaxed">{content}</p>
  </div>
);

const EnhancedListSection = ({ title, items, icon }) => {
  // Convert stringified JSON array to actual array if needed
  const itemList = Array.isArray(items) ? items : JSON.parse(items || '[]');
  
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-4 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h3>
      <ul className="space-y-3">
        {itemList.map((item, index) => (
          <li key={index} className="flex items-start">
            <FiArrowRight className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


const SearchPlace = () => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());

  const backgrounds = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get(`https://askit-6h2d.onrender.com/api/place/?q=${query}`);
      setPlaces(response.data);
      setError("");
    } catch (err) {
      setError("No matching places found");
      setPlaces([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <div 
          className="relative h-screen overflow-hidden"
          style={{
            backgroundImage: `url(${backgrounds[backgroundIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 1.5s ease-in-out'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-4 w-full max-w-4xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif">
                Discover <span className="text-yellow-400">Incredible India</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Explore ancient heritage, vibrant cultures, and breathtaking landscapes
              </p>
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-grow">
                  <FiSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Search city, heritage site or place..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-4 rounded-full border-0 focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50 shadow-lg"
                  />
                </div>
                <motion.button
                  onClick={handleSearch}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-xl"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center text-lg">
                      <FiSearch className="mr-2 text-xl" />
                      Explore Now
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-white text-center"
            >
              <p className="mb-2">Scroll to explore</p>
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Results Section */}
        <div className="container mx-auto px-4 py-16">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-lg shadow-md"
              >
                <p>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Single Place Detail View */}
          {places.length === 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-16 border border-gray-100">
                <div className="relative h-97">
                  <img
                    src={places[0].banner}
                    alt={places[0].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-4xl font-bold text-white mb-2">{places[0].name}</h2>
                        <div className="flex items-center text-yellow-300">
                          <FiMapPin className="mr-2" />
                          <span>{places[0].location}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleFavorite(places[0].id)}
                        className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                      >
                        <FiHeart 
                          className={`text-2xl ${favorites.has(places[0].id) ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">{places[0].description}</p>

                  {/* Quick Facts */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl flex items-center border border-yellow-100 shadow-sm"
                    >
                      <div className="bg-yellow-100 p-4 rounded-xl mr-4">
                        <FiCalendar className="text-yellow-600 text-2xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Best Time to Visit</h4>
                        <p className="text-gray-600">{places[0].best_time || "October to March"}</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl flex items-center border border-blue-100 shadow-sm"
                    >
                      <div className="bg-blue-100 p-4 rounded-xl mr-4">
                        <FiClock className="text-blue-600 text-2xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Visiting Hours</h4>
                        <p className="text-gray-600">{places[0].visiting_hours || "9:00 AM - 5:00 PM"}</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl flex items-center border border-green-100 shadow-sm"
                    >
                      <div className="bg-green-100 p-4 rounded-xl mr-4">
                        <FiDollarSign className="text-green-600 text-2xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Entry Fee</h4>
                        <p className="text-gray-600">{places[0].entry_fee || "₹50 for Indians"}</p>
                      </div>
                    </motion.div>
                  </div>

                  <EnhancedSection 
                    title="History & Significance" 
                    content={places[0].history} 
                    icon={<FiInfo className="text-indigo-500" />} 
                  />
                  
                  <EnhancedSection 
                    title="Architectural Marvel" 
                    content={places[0].architecture} 
                    icon={<FiCompass className="text-amber-500" />} 
                  />
                  
                  <EnhancedListSection 
                    title="Did You Know?" 
                    items={places[0].fun_facts} 
                    icon={<FiStar className="text-yellow-500" />}
                  />
                  
                  <EnhancedListSection 
                    title="Traveler's Tips" 
                    items={places[0].visitor_tips} 
                    icon={<FiInfo className="text-blue-500" />}
                  />

                  {/* Gallery Section */}
                  {places[0].gallery && places[0].gallery.length > 0 && (
                    <div className="mt-12">
                      <h3 className="text-2xl font-bold mb-6 flex items-center">
                        <FiCamera className="mr-2 text-rose-500" />
                        Photo Gallery
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {places[0].gallery.map((image, idx) => (
                          <motion.div 
                            key={idx} 
                            whileHover={{ scale: 1.03 }}
                            className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <img
                              src={image}
                              alt={`${places[0].name} gallery ${idx + 1}`}
                              className="w-full h-64 object-cover"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Multiple Places View */}
          {places.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                We found <span className="text-indigo-600">{places.length}</span> places matching "{query}"
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {places.map((place) => (
                  <motion.div 
                    key={place.id}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={place.banner}
                        alt={place.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <button 
                        onClick={() => toggleFavorite(place.id)}
                        className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                      >
                        <FiHeart 
                          className={`text-xl ${favorites.has(place.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
                        />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-xl font-bold text-white">{place.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-gray-500 mb-3">
                        <FiMapPin className="mr-1" />
                        <span className="text-sm">{place.location}</span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3">{place.description}</p>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center"
                        onClick={() => setPlaces([place])}
                      >
                        View Details
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          
          {/* Empty State */}
          {!isLoading && places.length === 0 && !error && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <FiMapPin className="mx-auto text-gray-300 text-5xl mb-4" />
                <h3 className="text-2xl font-medium text-gray-600 mb-2">Start Your Journey</h3>
                <p className="text-gray-500">
                  Search for incredible destinations across India. Discover heritage sites, natural wonders, and cultural treasures.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FiCompass className="text-yellow-400 mr-2" />
                Explore India
              </h3>
              <p className="text-gray-400 mb-4">
                Your gateway to discovering India's incredible diversity and beauty.
              </p>
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
            <div>
              <h4 className="text-lg font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Heritage Sites</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Hill Stations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Beaches</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Wildlife</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Pilgrimage</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Travel Info</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Best Time to Visit</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Travel Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Transportation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Cultural Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Festivals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>contact@exploreindia.com</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>123 Travel Street, Mumbai, Maharashtra 400001</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Explore India. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchPlace;