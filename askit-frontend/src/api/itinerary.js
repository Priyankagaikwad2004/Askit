import axios from "axios";

const API_URL = "https://askit-6h2d.onrender.com/api/generate-itinerary/"; 
// change if backend is hosted elsewhere

export async function generateItinerary(city, days, budget, interests) {
  const response = await axios.post(API_URL, {
    city,
    days,
    budget,
    interests,
  });
  return response.data; // JSON from backend
}
