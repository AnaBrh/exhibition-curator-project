import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExhibitionPage = () => {
  const [exhibition, setExhibition] = useState([]);

  useEffect(() => {
    // Load the exhibition from sessionStorage
    const savedExhibition = sessionStorage.getItem('exhibition');
    if (savedExhibition) {
      setExhibition(JSON.parse(savedExhibition));
    }
  }, []);

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
              <div key={`${artwork.source}-${artwork.id || artwork.objectID}`}>
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title} 
                  style={{ width: '100px', height: 'auto' }} 
                />
                <h3>{artwork.title}</h3>
                <p>{artwork.artistDisplayName}</p>
                {/* Removed the Remove button */}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ExhibitionPage;
