import React from "react";
import { motion } from "framer-motion";

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const Itinerary = ({ data }) => {
  if (!data) return null;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-6 text-white shadow-lg"
        variants={itemVariants}
      >
        <h1 className="text-3xl font-bold mb-2">{data.city} Itinerary</h1>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{data.days} {data.days === 1 ? 'Day' : 'Days'}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>₹{data.budget.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>

      {/* Itinerary Days */}
      <div className="space-y-6">
        {data.itinerary.map((day, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 text-white">
              <h2 className="text-xl font-bold">Day {day.day}</h2>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Morning */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🌅</span>
                  <h3 className="font-semibold text-blue-700">Morning</h3>
                </div>
                <div className="ml-8">
                  <h4 className="font-medium text-gray-700">Places:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {day.morning.places.map((place, i) => (
                      <li key={i}>{place}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm"><span className="font-medium">Food:</span> {day.morning.food}</p>
                  <p className="text-sm text-blue-600 font-medium">Cost: {day.morning.cost}</p>
                </div>
              </div>
              
              {/* Afternoon */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">☀️</span>
                  <h3 className="font-semibold text-yellow-700">Afternoon</h3>
                </div>
                <div className="ml-8">
                  <h4 className="font-medium text-gray-700">Places:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {day.afternoon.places.map((place, i) => (
                      <li key={i}>{place}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm"><span className="font-medium">Food:</span> {day.afternoon.food}</p>
                  <p className="text-sm text-yellow-600 font-medium">Cost: {day.afternoon.cost}</p>
                </div>
              </div>
              
              {/* Evening */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🌙</span>
                  <h3 className="font-semibold text-purple-700">Evening</h3>
                </div>
                <div className="ml-8">
                  <h4 className="font-medium text-gray-700">Places:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {day.evening.places.map((place, i) => (
                      <li key={i}>{place}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm"><span className="font-medium">Food:</span> {day.evening.food}</p>
                  <p className="text-sm text-purple-600 font-medium">Cost: {day.evening.cost}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Budget Breakdown */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-6 mt-6"
        variants={itemVariants}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Budget Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(data.budget_breakdown).map(([category, amount], index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
              <div className="text-lg font-medium text-gray-700">{category.replace(/_/g, ' ').toUpperCase()}</div>
              <div className="text-2xl font-bold text-blue-600 mt-2">{amount}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Travel Tips */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-6 mt-6"
        variants={itemVariants}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Travel Tips</h2>
        <ul className="space-y-2">
          {data.tips.map((tip, index) => (
            <motion.li 
              key={index} 
              className="flex items-start"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{tip}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Itinerary;