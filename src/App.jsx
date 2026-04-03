import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BestSellerPage from './components/BestSellerPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/best-sellers" element={<BestSellerPage />} />
      </Routes>
    </Router>
  );
};

export default App;