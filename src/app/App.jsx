import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "../widgets/Header/Header.jsx";
import Main from "../pages/Main/Main.jsx";
import About from "../pages/About/About.jsx";
import Services from "../pages/Services/Services.jsx";
import Blog from "../pages/Blog/Blog.jsx";
import Contact from "../pages/Contact/Contact.jsx";

// Tour pages


import './App.css';
import Excursions from "../pages/Excursions/Excursions.jsx";
import BeachRelax from "../pages/BeachRelax/BeachRelax.jsx";
import MountainRelax from "../pages/MountainRelax/MountainRelax.jsx";
import CasinoTour from "../pages/CasinoTour/CasinoTour.jsx";
import WeddingTour from "../pages/WeddingTour/WeddingTour.jsx";

function App() {
  return (
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />

              {/* Tour Routes */}
              <Route path="/excursions" element={<Excursions />} />
              <Route path="/beach-relax" element={<BeachRelax />} />
              <Route path="/mountain-relax" element={<MountainRelax />} />
              <Route path="/casino-tour" element={<CasinoTour />} />
              <Route path="/wedding-tour" element={<WeddingTour/>} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;