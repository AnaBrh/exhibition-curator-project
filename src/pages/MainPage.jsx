import React, { useState } from "react";
import { fetchArtworks } from "../api/fetchArtworks";
import ArtworksDisplay from "../components/ArtworksDisplay";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArtworks(query, sortOption);
      setResults(data);
      setHasSearched(true);
    } catch (err) {
      console.error("Error fetching artworks:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h1 aria-label="Search the Gallery">Search the Gallery</h1>
      <header>
        {hasSearched && (
          <Link to="/exhibition" id="exhibition-link">
            View My Exhibition
          </Link>
        )}
        <input
          aria-label="Search Bar"
          className="search-bar"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search..."
        />
        <button onClick={handleSearch}>Search</button>
      </header>
      <main>
        {hasSearched && (
          <p id="modal-description">Select an artwork to view details.</p>
        )}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <ArtworksDisplay
          artworks={results}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </main>
    </div>
  );
};

export default MainPage;
