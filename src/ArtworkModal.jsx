import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ArtworkModal = ({ isOpen, onRequestClose, artwork }) => {
  if (!artwork) return null;

  const getArtistName = (artwork) => {
    if (artwork.artistDisplayName) {
      return artwork.artistDisplayName;
    }
    if (artwork.people && artwork.people.length > 0) {
      return artwork.people[0].displayname || '';
    }
    return 'Unknown Artist';
  };

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
      <p><strong>Date:</strong> {artwork.dated || artwork.objectDate}</p>
      <p><strong>Medium:</strong> {artwork.medium}</p>
      <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
      <p><strong>Description:</strong> {artwork.description || artwork.labeltext}</p>
      <p><strong>Credit Line:</strong> {artwork.creditline}</p>
    </Modal>
  );
};

export default ArtworkModal;
