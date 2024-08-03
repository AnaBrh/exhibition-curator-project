import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ExhibitionPage from './pages/ExhibitionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/exhibition" element={<ExhibitionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
