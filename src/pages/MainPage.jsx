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
  const [hasSearched, setHasSearched] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    severity: "",
  });

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
    setNotification({ message: "", severity: "" });
    try {
      const data = await fetchArtworks(query, filters, sortOption);
      setResults(data);
      setHasSearched(true);
    } catch (err) {
      console.error("Error fetching artworks:", err);
      setError(err);
      setNotification({
        message: "Failed to load artworks.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderNotification = () => {
    if (notification.message) {
      return (
        <div role="alert">
          <p>{notification.message}</p>
          {notification.severity === "error" && (
            <span style={{ color: "red" }}>(Please try again later.)</span>
          )}
        </div>
      );
    }
    return null;
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
        {renderNotification()}
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
