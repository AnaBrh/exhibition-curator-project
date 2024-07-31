import React, { useState } from 'react';
import { fetchArtworks } from './api';
import ArtworksDisplay from './ArtworksDisplay';

const MainPage = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('');
  const [results, setResults] = useState({ harvardArtworks: [], metArtworks: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        
        <ArtworksDisplay harvardArtworks={results.harvardArtworks} metArtworks={results.metArtworks} />
      </main>
    </div>
  );
};

export default MainPage;
