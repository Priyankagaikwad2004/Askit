import React, { useState } from "react";
import { FiMapPin, FiCamera, FiInfo, FiClock, FiLayout, FiSmile, FiAward, FiPlus, FiX } from "react-icons/fi";

const AddPlace = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    banner: "",
    description: "",
    history: "",
    architecture: "",
    fun_facts: [""],
    visitor_tips: [""],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://askit-6h2d.onrender.com/api/add-place/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("✅ Place added successfully!");
      setFormData({
        name: "",
        location: "",
        banner: "",
        description: "",
        history: "",
        architecture: "",
        fun_facts: [""],
        visitor_tips: [""],
      });
    } else {
      alert("❌ Failed to add place");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="text-yellow-500">✨</span> Share a New Travel Gem <span className="text-yellow-500">✨</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Help fellow travelers discover hidden treasures. Share details about amazing places you've visited!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Place Name */}
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                    <FiAward className="mr-2 text-yellow-500" />
                    Place Name
                  </label>
                  <input
                    name="name"
                    placeholder="e.g., Taj Mahal, Golden Temple"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                    <FiMapPin className="mr-2 text-yellow-500" />
                    Location
                  </label>
                  <input
                    name="location"
                    placeholder="City, State, Country"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Banner Image URL */}
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                    <FiCamera className="mr-2 text-yellow-500" />
                    Banner Image URL
                  </label>
                  <input
                    type="url"
                    name="banner"
                    placeholder="https://example.com/image.jpg"
                    value={formData.banner}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                    <FiInfo className="mr-2 text-yellow-500" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe this place in a few sentences..."
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* History */}
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                    <FiClock className="mr-2 text-yellow-500" />
                    History
                  </label>
                  <textarea
                    name="history"
                    placeholder="Share the historical significance of this place..."
                    value={formData.history}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Architecture */}
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                    <FiLayout className="mr-2 text-yellow-500" />
                    Architecture
                  </label>
                  <textarea
                    name="architecture"
                    placeholder="Describe the architectural style and features..."
                    value={formData.architecture}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Fun Facts */}
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                    <FiSmile className="mr-2 text-yellow-500" />
                    Fun Facts
                  </label>
                  {formData.fun_facts.map((fact, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        value={fact}
                        onChange={(e) => handleArrayChange(e, index, "fun_facts")}
                        placeholder={`Fun Fact ${index + 1}`}
                        className="flex-grow border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      />
                      {formData.fun_facts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField("fun_facts", index)}
                          className="ml-2 text-red-500 hover:text-red-700 p-3 rounded-full hover:bg-red-50 transition-colors duration-300"
                        >
                          <FiX />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField("fun_facts")}
                    className="mt-2 flex items-center text-yellow-600 hover:text-yellow-700 font-medium py-2 px-4 rounded-lg hover:bg-yellow-50 transition-all duration-300"
                  >
                    <FiPlus className="mr-1" /> Add Another Fun Fact
                  </button>
                </div>

                {/* Visitor Tips */}
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                    <FiAward className="mr-2 text-yellow-500" />
                    Traveler Tips
                  </label>
                  {formData.visitor_tips.map((tip, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        value={tip}
                        onChange={(e) => handleArrayChange(e, index, "visitor_tips")}
                        placeholder={`Tip ${index + 1}`}
                        className="flex-grow border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      />
                      {formData.visitor_tips.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField("visitor_tips", index)}
                          className="ml-2 text-red-500 hover:text-red-700 p-3 rounded-full hover:bg-red-50 transition-colors duration-300"
                        >
                          <FiX />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField("visitor_tips")}
                    className="mt-2 flex items-center text-yellow-600 hover:text-yellow-700 font-medium py-2 px-4 rounded-lg hover:bg-yellow-50 transition-all duration-300"
                  >
                    <FiPlus className="mr-1" /> Add Another Tip
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Share Your Travel Gem
                </button>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FiCamera className="mr-2 text-yellow-500" />
                Live Preview
              </h2>
              
              {formData.banner ? (
                <div className="mb-4 overflow-hidden rounded-xl">
                  <img 
                    src={formData.banner} 
                    alt="Banner preview" 
                    className="w-full h-48 object-cover transition-all duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                  <FiCamera className="text-4xl text-gray-400" />
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {formData.name || "Place Name"}
              </h3>
              
              <div className="flex items-center text-gray-600 mb-4">
                <FiMapPin className="mr-2 text-yellow-500" />
                <span>{formData.location || "Location will appear here"}</span>
              </div>
              
              <p className="text-gray-700">
                {formData.description || "Description will appear here as you type..."}
              </p>
              
              {(formData.fun_facts.some(fact => fact !== "") || formData.visitor_tips.some(tip => tip !== "")) && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Highlights:</h4>
                  <ul className="space-y-2">
                    {formData.fun_facts.filter(fact => fact !== "").slice(0, 2).map((fact, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-700">{fact}</span>
                      </li>
                    ))}
                    {formData.visitor_tips.filter(tip => tip !== "").slice(0, 2).map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlace;