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
  FiYoutube
} from "react-icons/fi";

const SearchPlace = () => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = [
    "https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/v1660823032/Best-Places-to-Visit-in-India-Amritsar/Best-Places-to-Visit-in-India-Amritsar.jpg",
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
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
      const response = await axios.get(`http://localhost:8000/api/place/?q=${query}`);
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

  return (
    <div className="min-h-screen flex flex-col">

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <div 
          className="relative h-96 overflow-hidden"
          style={{
            backgroundImage: `url(${backgrounds[backgroundIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 1.5s ease-in-out'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-5xl font-bold text-white mb-6">
                Discover Incredible India
              </h1>
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-grow">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search city, heritage site or place..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full font-medium hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg"
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
                    <span className="flex items-center justify-center">
                      <FiSearch className="mr-2" />
                      Explore
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="container mx-auto px-4 py-12">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded">
              <p>{error}</p>
            </div>
          )}

          {/* Single Place Detail View */}
          {places.length === 1 && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
                <div className="relative h-96">
                  <img
                    src={places[0].banner}
                    alt={places[0].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <h2 className="text-4xl font-bold text-white mb-2">{places[0].name}</h2>
                    <div className="flex items-center text-yellow-300">
                      <FiMapPin className="mr-2" />
                      <span>{places[0].location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">{places[0].description}</p>

                  {/* Quick Facts */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-yellow-50 p-4 rounded-lg flex items-center">
                      <div className="bg-yellow-100 p-3 rounded-full mr-4">
                        <FiInfo className="text-yellow-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Best Time to Visit</h4>
                        <p className="text-gray-600">{places[0].best_time || "October to March"}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <FiClock className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Visiting Hours</h4>
                        <p className="text-gray-600">{places[0].visiting_hours || "9:00 AM - 5:00 PM"}</p>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg flex items-center">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FiDollarSign className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Entry Fee</h4>
                        <p className="text-gray-600">{places[0].entry_fee || "₹50 for Indians"}</p>
                      </div>
                    </div>
                  </div>

                  <EnhancedSection title="History" content={places[0].history} icon={<FiSun />} />
                  <EnhancedSection title="Architecture" content={places[0].architecture} icon={<FiSun />} />
                  <EnhancedListSection title="Fun Facts" items={places[0].fun_facts} />
                  <EnhancedListSection title="Visitor Tips" items={places[0].visitor_tips} />

                  {/* Gallery Section */}
                  {places[0].gallery && places[0].gallery.length > 0 && (
                    <div className="mt-12">
                      <h3 className="text-2xl font-bold mb-6 flex items-center">
                        <FiSun className="mr-2 text-yellow-500" />
                        Photo Gallery
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {places[0].gallery.map((image, idx) => (
                          <div key={idx} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                            <img
                              src={image}
                              alt={`${places[0].name} gallery ${idx + 1}`}
                              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Multiple Places View */}
          {places.length > 1 && (
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">
                We found {places.length} places matching "{query}"
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {places.map((place) => (
                  <div 
                    key={place.id} 
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={place.banner}
                        alt={place.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-xl font-bold text-white">{place.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-gray-500 mb-2">
                        <FiMapPin className="mr-1" />
                        <span className="text-sm">{place.location}</span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3">{place.description}</p>
                      <button className="text-yellow-600 font-medium hover:text-yellow-700 transition-colors" onClick={() => setPlaces([place])}>
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
      <footer className="bg-gray-800 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FiCompass className="text-yellow-400 mr-2" />
                Explore India
              </h3>
              <p className="text-gray-400">
                Discover the rich cultural heritage and breathtaking landscapes of India.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Destinations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Travel Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">About Us</a></li>
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
    </div>
  );
};

const EnhancedSection = ({ title, content, icon }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4 flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </h3>
    <p className="text-gray-700 leading-relaxed">{content}</p>
  </div>
);

const EnhancedListSection = ({ title, items }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start">
          <span className="inline-block bg-yellow-100 text-yellow-800 rounded-full p-1 mr-3 mt-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
            </svg>
          </span>
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default SearchPlace;