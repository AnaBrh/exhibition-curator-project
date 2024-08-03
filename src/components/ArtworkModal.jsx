import React from 'react';
import Modal from 'react-modal';
import { getArtistName } from '../utils/getArtistName';
import { formatDate, formatClassification, formatDepartment, formatMedium, getMoreInfoUrl } from '../utils/formatting';

Modal.setAppElement('#root');

const ArtworkModal = ({ isOpen, onRequestClose, artwork, handleAddRemoveArtwork, isArtworkInExhibition }) => {
  if (!artwork) return null;

  const imageUrl = artwork.primaryImage || artwork.imageUrl || artwork.primaryimageurl;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Artwork Details"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '80%',
          maxHeight: '80%',
          overflow: 'auto'
        }
      }}
    >
      <button onClick={onRequestClose} style={{ float: 'right' }}>Close</button>
      <h1>{artwork.title}</h1>
      <img 
        src={imageUrl} 
        alt={artwork.title} 
        style={{ width: '300px', height: 'auto' }} 
      />
      <h2>Artist: {getArtistName(artwork)}</h2>
      <p><strong>Date:</strong> {formatDate(artwork)}</p>
      <p><strong>Medium:</strong> {formatMedium(artwork)}</p>
      <p><strong>Classification:</strong> {formatClassification(artwork)}</p>
      <p><strong>Department:</strong> {formatDepartment(artwork)}</p>
      <a href={getMoreInfoUrl(artwork)} target="_blank" rel="noopener noreferrer">More Info</a>
      <button onClick={handleAddRemoveArtwork}>
        {isArtworkInExhibition(artwork) ? 'Remove from Exhibition' : 'Add to Exhibition'}
      </button>
    </Modal>
  );
};

export default ArtworkModal;
