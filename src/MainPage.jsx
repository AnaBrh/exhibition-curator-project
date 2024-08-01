import React, { useState } from 'react';
import { fetchArtworks } from './api';
import ArtworksDisplay from './ArtworksDisplay';
import ExhibitionPage from './ExhibitionPage';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('');
  const [results, setResults] = useState({ harvardArtworks: [], metArtworks: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [exhibition, setExhibition] = useState([]); 

  const handleAddToExhibition = (artwork, source) => {
    let exhibition = JSON.parse(sessionStorage.getItem('exhibition')) || [];

    // Check if the artwork is already in the exhibition
    const isArtworkInExhibition = exhibition.some(item => {
      if (source === 'harvard') {
        return item.id === artwork.id;
      } else if (source === 'met') {
        return item.objectID === artwork.objectID;
      }
      return false;
    });
  
    if (!isArtworkInExhibition) {
      const artworkWithSource = { ...artwork, source }; // Add source to the artwork
      exhibition.push(artworkWithSource);
      sessionStorage.setItem('exhibition', JSON.stringify(exhibition));
      setExhibition(exhibition); 
    }
    console.log("Added to exhibition");
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArtworks(query, filters, sortOption);
      setResults(data);
    } catch (err) {
      console.error('Error fetching artworks:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <header>
      <h1>Search the Gallery</h1>
      <Link to="/exhibition">View My Exhibition</Link>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search all fields"
        />
        <button onClick={handleSearch}>Search</button>
      </header>

      <main>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        
        <ArtworksDisplay 
          harvardArtworks={results.harvardArtworks} 
          metArtworks={results.metArtworks}
          handleAddToExhibition={handleAddToExhibition}
        />
          {selectedArtworks.length > 0 && <ExhibitionPage selectedArtworks={selectedArtworks} />}
      </main>
    </div>
  );
};

export default MainPage;
