import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ExhibitionPage from './ExhibitionPage';
import ArtworkDetailPage from './ArtworkDetailPage';

function App() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const savedExhibition = sessionStorage.getItem('exhibition');
    if (savedExhibition) {
      setArtworks(JSON.parse(savedExhibition));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage setArtworks={setArtworks} />} />
        <Route path="/exhibition" element={<ExhibitionPage artworks={artworks} />} />
        <Route path="/artwork/:source/:id" element={<ArtworkDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
