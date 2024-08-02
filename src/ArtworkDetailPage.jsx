import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MET_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
const HARVARD_API_URL = "https://api.harvardartmuseums.org/object";
const HARVARD_API_KEY = import.meta.env.VITE_HARVARD_API_KEY;

const ArtworkDetailPage = () => {
  const { source, id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        let response;
        if (source === 'met') {
          response = await axios.get(`${MET_API_URL}/${id}`);
        } else if (source === 'harvard') {
          response = await axios.get(`${HARVARD_API_URL}/${id}`, {
            params: {
              apikey: HARVARD_API_KEY,
            }
          });
        }
        setArtwork(response.data);
      } catch (err) {
        console.error('Error fetching artwork details:', err);
        setError('Error fetching artwork details');
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [source, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!artwork) {
    return <p>Artwork not found.</p>;
  }

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
    <div>
      <header>
        <h1>{artwork.title}</h1>
        <Link to="/">Main Page</Link> | <Link to="/exhibition">My Exhibition</Link>
      </header>
      <main>
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
      </main>
    </div>
  );
};

export default ArtworkDetailPage;
