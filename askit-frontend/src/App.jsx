import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import SearchPlace from "./pages/SearchPlace";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddPlace from "./pages/AddPlace";
import ItineraryPage from "./pages/SearchPage"; 
import PrivateRoute from "./components/PrivateRoute"; // 👈 import

function App() {
  return (
    <Router>
      <Header />
      <main className="p-4">
        <Routes>
          {/* Default opens login page */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchPlace />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-place"
            element={
              <PrivateRoute>
                <AddPlace />
              </PrivateRoute>
            }
          />
          <Route
            path="/itinerary"
            element={
              <PrivateRoute>
                <ItineraryPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
