import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExhibitionPage = () => {
  const [exhibition, setExhibition] = useState([]);

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
  
  return (
    <div>
      <header>
        <h1>My Exhibition</h1>
        <Link to="/">Back to Search</Link>
      </header>
      <main>
        {exhibition.length === 0 ? (
          <p>No artworks in your exhibition yet.</p>
        ) : (
          <div>
            {exhibition.map(artwork => (
              <div key={`${artwork.source}-${artwork.objectid || artwork.objectID}`}>
                <Link to={`/artwork/${artwork.source}/${artwork.objectid || artwork.objectID}`}>
                  <img 
                    src={artwork.imageUrl || artwork.primaryImage} 
                    alt={artwork.title} 
                    style={{ width: '100px', height: 'auto' }} 
                  />
                </Link>
                <h3>{artwork.title}</h3>
                <p>{getArtistName(artwork)}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ExhibitionPage;
