import axios from "axios";

export const fetchPlace = async (placeName) => {
  const response = await axios.get(
    `http://localhost:8000/api/place/?q=${encodeURIComponent(placeName)}`
  );
  return response.data;
};
