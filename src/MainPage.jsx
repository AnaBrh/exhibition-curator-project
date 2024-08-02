import React, { useState } from 'react';
import { fetchArtworks } from './api';
import ArtworksDisplay from './ArtworksDisplay';
import { Link } from 'react-router-dom';

const MainPage = ({ setArtworks }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('');
  const [results, setResults] = useState({ harvardArtworks: [], metArtworks: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToExhibition = (artwork, source) => {
    let exhibition = JSON.parse(sessionStorage.getItem('exhibition')) || [];

    const isArtworkInExhibition = exhibition.some(item => {
      if (source === 'harvard') {
        return item.objectid === artwork.objectid;
      } else if (source === 'met') {
        return item.objectID === artwork.objectID;
      }
      return false;
    });

    if (!isArtworkInExhibition) {
      const artworkWithSource = { ...artwork, source };
      exhibition.push(artworkWithSource);
      sessionStorage.setItem('exhibition', JSON.stringify(exhibition));
      setArtworks(exhibition);
    }
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
          onKeyDown={handleKeyPress}
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
      </main>
    </div>
  );
};

export default MainPage;
