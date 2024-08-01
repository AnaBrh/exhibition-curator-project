import React, { useState, useEffect } from 'react';
import SortDropdown from './SortDropdown';

const ArtworksDisplay = ({ harvardArtworks, metArtworks }) => {
  const [sortOption, setSortOption] = useState('relevance');
  const [sortedHarvardArtworks, setSortedHarvardArtworks] = useState([]);
  const [sortedMetArtworks, setSortedMetArtworks] = useState([]);

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

    const getArtistName = (artwork) => {
      if (artwork.artistDisplayName) {
        return artwork.artistDisplayName;
      }
      if (artwork.people && artwork.people.length > 0) {
        return artwork.people[0].displayname || '';
      }
      return '';
    };

    setSortedHarvardArtworks(sortArtworks(harvardArtworks, sortOption));
    setSortedMetArtworks(sortArtworks(metArtworks, sortOption));
  }, [harvardArtworks, metArtworks, sortOption]);

  return (
    <div>
      <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
      <div>
        {sortedMetArtworks.map(artwork => {
          const artistName = artwork.artistDisplayName || 'Unknown Artist';
          return (
            <div key={artwork.objectID}>
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
              <h3>{artwork.title}</h3>
              <p>{artistName}</p>
            </div>
          );
        })}
      </div>
      <div>
        {sortedHarvardArtworks.map(artwork => {
          const artistName = artwork.people && artwork.people.length > 0 
            ? artwork.people[0].displayname 
            : 'Unknown Artist';
          return (
            <div key={artwork.id}>
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
              <h3>{artwork.title}</h3>
              <p>{artistName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtworksDisplay;
