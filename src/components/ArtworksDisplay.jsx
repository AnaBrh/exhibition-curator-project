import React, { useState, useEffect } from "react";
import SortDropdown from "./SortDropdown";
import ArtworkModal from "./ArtworkModal";
import { getArtistName } from "../utils/getArtistName";
import { sortArtworks } from "../utils/sortArtworks";
import { useExhibition } from "../ExhibitionContext";

const ArtworksDisplay = ({ artworks, sortOption, setSortOption }) => {
  const { selectedArtwork, modalIsOpen, handleOpenModal, handleCloseModal } = useExhibition();

  const [sortedArtworks, setSortedArtworks] = useState([]);

  useEffect(() => {
    setSortedArtworks(sortArtworks(artworks, sortOption));
  }, [artworks, sortOption]);

  return (
    <div>
      {artworks.length > 0 && (
        <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
      )}
      <div className="artwork-grid">
        {sortedArtworks.map((artwork) => (
          <div id="artwork-item" key={artwork.objectid || artwork.objectID}>
            <img
              src={artwork.imageUrl || artwork.primaryImage}
              alt={artwork.title}
              onClick={() => handleOpenModal(artwork)}
              style={{ cursor: "pointer", display: "block", maxWidth: "100%" }}
            />
            <h3>{artwork.title}</h3>
            <p>{getArtistName(artwork)}</p>
          </div>
        ))}
      </div>
        {selectedArtwork && (
          <ArtworkModal 
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          artwork={selectedArtwork} 
          />
        )}
    </div>
  );
};

export default ArtworksDisplay;
