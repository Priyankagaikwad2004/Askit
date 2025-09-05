import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import SearchPlace from "./pages/SearchPlace";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddPlace from "./pages/AddPlace";
import ItineraryPage from "./pages/SearchPage"; // 👈 import new page

function App() {
  return (
    <Router>
      <Header />
      <main className="p-4">
        <Routes>
          {/* Default opens login page */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<SearchPlace />} /> {/* Dashboard */}
          <Route path="/add-place" element={<AddPlace />} />
          <Route path="/itinerary" element={<ItineraryPage />} /> {/* 👈 New Itinerary Page */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
