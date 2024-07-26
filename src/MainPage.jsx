import React, { useState } from 'react';
import { fetchArtworks } from './api'; // Import your fetchArtworks function
import FilterDropdown from './FilterDropdown'; // Import FilterDropdown
import SortDropdown from './SortDropdown'; // Import SortDropdown

const MainPage = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('');
  const [results, setResults] = useState({ harvardArtworks: [], metArtworks: [] });

  const handleSearch = async () => {
    const data = await fetchArtworks(query, filters, sortOption);
    setResults(data);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div>
      <header>
        <h1>Artworks Search</h1>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search artworks"
        />
        <button onClick={handleSearch}>Search</button>
        
        <FilterDropdown onFilterChange={handleFilterChange} />
        <SortDropdown onSortChange={handleSortChange} />
      </header>

      <main>
        <section>
          {results.harvardArtworks.map(artwork => (
            <div key={artwork.id}>
              <h3>{artwork.title}</h3>
              <p>{artwork.artist}</p>
              <img src={artwork.primaryImageUrl} alt={artwork.title} />
            </div>
          ))}
        </section>
        <section>
          {results.metArtworks.map(artwork => (
            <div key={artwork.objectID}>
              <h3>{artwork.title}</h3>
              <p>{artwork.artistDisplayName}</p>
              <img src={artwork.primaryImageSmall} alt={artwork.title} />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default MainPage;
