import React, { useState, useEffect } from "react";
import ArtworkModal from "../components/ArtworkModal";
import { Link } from "react-router-dom";
import { getArtistName } from "../utils/getArtistName";
import { useExhibition } from "../ExhibitionContext";

const ExhibitionPage = () => {
  const {
    exhibition,
    setExhibition,
    selectedArtwork,
    modalIsOpen,
    handleOpenModal,
    handleCloseModal,
  } = useExhibition();

  useEffect(() => {
    const savedExhibition = sessionStorage.getItem("exhibition");
    if (savedExhibition) {
      setExhibition(JSON.parse(savedExhibition));
    }
  }, []);

  return (
    <div>
      <header>
        <h1>My Exhibition</h1>
        <Link to="/">Home</Link>
      </header>

      <main>
        <div className="artwork-grid">
          {exhibition.map((artwork) => (
            <div id="artwork-item" key={artwork.objectid || artwork.objectID}>
              <img
                src={artwork.imageUrl || artwork.primaryImage}
                alt={artwork.title}
                onClick={() => handleOpenModal(artwork)}
                style={{
                  cursor: "pointer",
                  display: "block",
                  maxWidth: "100%",
                }}
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
      </main>
    </div>
  );
};

export default ExhibitionPage;
