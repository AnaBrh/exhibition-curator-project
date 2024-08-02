import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import SortDropdown from './SortDropdown'; 

const ArtworksDisplay = ({ harvardArtworks, metArtworks, handleAddToExhibition, exhibition }) => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState('relevance');
  const [sortedHarvardArtworks, setSortedHarvardArtworks] = useState([]);
  const [sortedMetArtworks, setSortedMetArtworks] = useState([]);

  const getArtistName = (artwork) => {
    if (artwork.artistDisplayName) {
      return artwork.artistDisplayName;
    }
    if (artwork.people && artwork.people.length > 0) {
      return artwork.people[0].displayname || '';
    }
    return '';
  };

  useEffect(() => {
    const sortArtworks = (artworks, option) => {
      return [...artworks].sort((a, b) => {
        switch (option) {
          case 'title-asc':
            return (a.title || '').localeCompare(b.title || '');
          case 'title-desc':
            return (b.title || '').localeCompare(a.title || '');
            case 'date-asc':
              return new Date(a.dateend || a.objectEndDate) - new Date(b.dateend || b.objectEndDate);
            case 'date-desc':
              return new Date(b.dateend || b.objectEndDate) - new Date(a.dateend || a.objectEndDate);
          case 'artist-asc':
            return (getArtistName(a) || 'zzzzz').localeCompare(getArtistName(b) || 'zzzzz');
          case 'artist-desc':
            return (getArtistName(b) || 'zzzzz').localeCompare(getArtistName(a) || 'zzzzz');
          case 'relevance':
          default:
            return 0;
        }
      });
    };

    setSortedHarvardArtworks(sortArtworks(harvardArtworks, sortOption));
    setSortedMetArtworks(sortArtworks(metArtworks, sortOption));
  }, [harvardArtworks, metArtworks, sortOption]);

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
      const action = isArtworkInExhibition(selectedArtwork) ? 'remove' : 'add';
      handleAddToExhibition(selectedArtwork, selectedArtwork.source, action);
    }
  };

  const isArtworkInExhibition = (artwork) => {
    return exhibition.some(item => 
      (artwork.source === 'harvard' && item.objectid === artwork.objectid) ||
      (artwork.source === 'met' && item.objectID === artwork.objectID)
    );
  };

  const formatDate = (artwork) => artwork.dated || artwork.objectDate || 'Unknown';
  const formatClassification = (artwork) => artwork.classification || 'Unknown';
  const formatDepartment = (artwork) => artwork.department || 'Unknown';
  const formatMedium = (artwork) => artwork.medium || 'Unknown';
  const getMoreInfoUrl = (artwork) => artwork.url || artwork.objectURL || '#';

  return (
    <div>
      <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
      <div>
      {sortedHarvardArtworks.map(artwork => (
          <div key={artwork.objectid}>
            <img 
              src={artwork.imageUrl} 
              alt={artwork.title} 
              onClick={() => handleOpenModal(artwork)}
              style={{ cursor: 'pointer', display: 'block', maxWidth: '100%' }}
            />
            <h3>{artwork.title}</h3>
            <p>{getArtistName(artwork)}</p>
          </div>
        ))}
        {sortedMetArtworks.map(artwork => (
          <div key={artwork.objectID}>
            <img 
              src={artwork.primaryImage} 
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
        appElement={document.getElementById('root')}
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
              {isArtworkInExhibition(selectedArtwork) ? 'Remove from Exhibition' : 'Add to Exhibition'}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ArtworksDisplay;
