import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { getArtistName } from '../utils/getArtistName';
import {
  formatDate,
  formatClassification,
  formatDepartment,
  formatMedium,
  getMoreInfoUrl,
} from "../utils/formatting";

const ExhibitionPage = () => {
  const [exhibition, setExhibition] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const savedExhibition = sessionStorage.getItem('exhibition');
    if (savedExhibition) {
      setExhibition(JSON.parse(savedExhibition));
    }
  }, []);


  const handleOpenModal = (artwork) => {
    setSelectedArtwork(artwork);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedArtwork(null);
    setModalIsOpen(false);
  };

  const handleAddRemoveArtwork = () => {
    if (selectedArtwork) {
      const action = exhibition.some(item =>
        (selectedArtwork.source === 'harvard' && item.objectid === selectedArtwork.objectid) ||
        (selectedArtwork.source === 'met' && item.objectID === selectedArtwork.objectID)
      ) ? 'remove' : 'add';
      handleAddToExhibition(selectedArtwork, selectedArtwork.source, action);
      handleCloseModal();
    }
  };

  const handleAddToExhibition = (artwork, source, action) => {
    let exhibitionList = JSON.parse(sessionStorage.getItem('exhibition')) || [];

    if (action === 'add') {
      if (!exhibitionList.some(item =>
        (source === 'harvard' && item.objectid === artwork.objectid) ||
        (source === 'met' && item.objectID === artwork.objectID)
      )) {
        exhibitionList.push({ ...artwork, source });
        sessionStorage.setItem('exhibition', JSON.stringify(exhibitionList));
        setExhibition(exhibitionList);
      }
    } else if (action === 'remove') {
      exhibitionList = exhibitionList.filter(item =>
        !((source === 'harvard' && item.objectid === artwork.objectid) ||
          (source === 'met' && item.objectID === artwork.objectID))
      );
      sessionStorage.setItem('exhibition', JSON.stringify(exhibitionList));
      setExhibition(exhibitionList);
    }
  };

  return (
    <div>
      <header>
        <h1>My Exhibition</h1>
        <Link to="/">Back to Search</Link>
      </header>

      <main>
        <div className='artwork-grid'>
          {exhibition.map(artwork => (
            <div id='artwork-item' key={artwork.objectid || artwork.objectID}>
              <img 
                src={artwork.imageUrl || artwork.primaryImage} 
                alt={artwork.title} 
                onClick={() => handleOpenModal(artwork)}
                style={{ cursor: 'pointer', display: 'block', maxWidth: '100%' }}
              />
              <h3>{artwork.title}</h3>
              <p>{getArtistName(artwork)}</p>
            </div>
          ))}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Artwork Details"
        >
          {selectedArtwork && (
            <div>
              <button onClick={handleCloseModal}>Close</button>
              <img src={selectedArtwork.imageUrl || selectedArtwork.primaryImage} alt={selectedArtwork.title} style={{ width: '300px', height: 'auto' }} />
              <h1>{selectedArtwork.title}</h1>
              <p>Artist: {getArtistName(selectedArtwork)}</p>
            <p>Date: {formatDate(selectedArtwork)}</p>
            <p>Medium: {formatMedium(selectedArtwork)}</p>
            <p>Classification: {formatClassification(selectedArtwork)}</p>
            <p>Department: {formatDepartment(selectedArtwork)}</p>
            <a href={getMoreInfoUrl(selectedArtwork)} target="_blank" rel="noopener noreferrer">More Info</a>
              <button onClick={handleAddRemoveArtwork}>
                {exhibition.some(item =>
                  (selectedArtwork.source === 'harvard' && item.objectid === selectedArtwork.objectid) ||
                  (selectedArtwork.source === 'met' && item.objectID === selectedArtwork.objectID)
                ) ? 'Remove from Exhibition' : 'Add to Exhibition'}
              </button>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
};

export default ExhibitionPage;
