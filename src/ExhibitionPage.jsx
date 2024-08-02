import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

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

  const getArtistName = (artwork) => {
    if (artwork.artistDisplayName) {
      return artwork.artistDisplayName;
    }
    if (artwork.people && artwork.people.length > 0) {
      return artwork.people[0].displayname || '';
    }
    return '';
  };

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
      handleCloseModal(); // Close modal after action
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
        <div>
          {exhibition.map(artwork => (
            <div key={artwork.objectid || artwork.objectID}>
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
              <p>Date: {selectedArtwork.date || 'Unknown'}</p>
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
