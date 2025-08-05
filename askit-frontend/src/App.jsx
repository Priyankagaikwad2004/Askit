import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchPlace from "./pages/SearchPlace";

function App() {
  return (
    <Router>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<SearchPlace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
