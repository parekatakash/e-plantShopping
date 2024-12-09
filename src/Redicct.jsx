import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import PlantsPage from './PlantsPage';
import CartPage from './CartPage';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Render Navbar at the top */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/plants" element={<PlantsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
