import React from 'react';

const ArtworksDisplay = ({ harvardArtworks, metArtworks }) => {
  return (
    <div>
      <h1>Harvard Artworks</h1>
      <div>
        {harvardArtworks.map(artwork => {
          // Extract artist's name from the 'people' array
          const artistName = artwork.people && artwork.people.length > 0 
            ? artwork.people[0].displayname 
            : 'Unknown Artist';

          return (
            <div key={artwork.id}>
              {artwork.imageUrl ? (
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title} 
                  style={{ display: 'block', maxWidth: '100%' }} 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg';
                    console.error('Image load error for URL:', artwork.imageUrl);
                  }} 
                />
              ) : (
                <img 
                  src='https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg'
                  alt="Placeholder" />
              )}
              <h3>{artwork.title}</h3>
              <p>{artistName}</p> {/* Display artist's name */}
            </div>
          );
        })}
      </div>
      
      <h1>Met Artworks</h1>
      <div>
        {metArtworks.map(artwork => {
          // Extract artist's name from 'artistDisplayName'
          const artistName = artwork.artistDisplayName || 'Unknown Artist';

          return (
            <div key={artwork.objectID}>
              {artwork.primaryImage ? (
                <img 
                  src={artwork.primaryImage} 
                  alt={artwork.title} 
                  style={{ display: 'block', maxWidth: '100%' }} 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg';
                    console.error('Image load error for URL:', artwork.primaryImage);
                  }} 
                />
              ) : (
                <img 
                  src='https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg'
                  alt="Placeholder" />
              )}
              <h3>{artwork.title}</h3>
              <p>{artistName}</p> {/* Display artist's name */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtworksDisplay;
