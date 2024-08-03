import React, { useState, useEffect } from "react";
import { fetchArtworks } from "../api/fetchArtworks";
import ArtworksDisplay from "../components/ArtworksDisplay";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exhibition, setExhibition] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleAddToExhibition = (artwork, source, action) => {
    let exhibitionList = JSON.parse(sessionStorage.getItem("exhibition")) || [];

    if (action === "add") {
      if (
        !exhibitionList.some(
          (item) =>
            (source === "harvard" && item.objectid === artwork.objectid) ||
            (source === "met" && item.objectID === artwork.objectID)
        )
      ) {
        exhibitionList.push({ ...artwork, source });
        sessionStorage.setItem("exhibition", JSON.stringify(exhibitionList));
        setExhibition(exhibitionList);
      }
    } else if (action === "remove") {
      exhibitionList = exhibitionList.filter(
        (item) =>
          !(
            (source === "harvard" && item.objectid === artwork.objectid) ||
            (source === "met" && item.objectID === artwork.objectID)
          )
      );
      sessionStorage.setItem("exhibition", JSON.stringify(exhibitionList));
      setExhibition(exhibitionList);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArtworks(query, filters, sortOption);
      setResults(data);
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
        <h1>Search the Gallery</h1>
      <header>
        <Link to="/exhibition" id="exhibition-link">View My Exhibition</Link>
        <input
          className="search-bar"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search..."        />
        <button onClick={handleSearch}>Search</button>
      </header>
      <main>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <ArtworksDisplay
          artworks={results}
          handleAddToExhibition={handleAddToExhibition}
          exhibition={exhibition}
        />
      </main>
    </div>
  );
};

export default MainPage;
