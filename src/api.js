import axios from 'axios';

const MET_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const HARVARD_API_URL = "https://api.harvardartmuseums.org";
const HARVARD_API_KEY = import.meta.env.VITE_HARVARD_API_KEY;

// Fetch Met Artworks
const fetchMetArtworks = async (query, filters = {}, sortOption = '') => {
  try {
    const searchResponse = await axios.get(`${MET_API_URL}/search`, {
      params: {
        q: query,
        hasImages: true,
        ...filters,
        sort: sortOption,
      }
    });

    const objectIDs = searchResponse.data.objectIDs || [];

    const artworks = await Promise.all(
      objectIDs.slice(0, 50).map(id => axios.get(`${MET_API_URL}/objects/${id}`))
    );

    return artworks
      .map(res => ({
        ...res.data,
        source: 'met', // Indicate the source as 'met'
      }))
      .filter(artwork => artwork.primaryImage);
  } catch (error) {
    console.error('Error fetching Met artworks:', error);
    return [];
  }
};

// Fetch Harvard Artworks
const fetchHarvardArtworks = async (query, filters = {}, sortOption = '') => {
  try {
    const params = {
      apikey: HARVARD_API_KEY,
      hasimage: 1,
      q: query,
      ...filters,
      sort: sortOption,
    };

    const response = await axios.get(`${HARVARD_API_URL}/object`, { params });

    const records = response.data.records || [];
    const artworksWithImages = records
      .filter(record => record.primaryimageurl || record.iiifbaseuri)
      .map(record => {
        let imageUrl = record.primaryimageurl;
        if (!imageUrl && record.iiifbaseuri) {
          imageUrl = `${record.iiifbaseuri}/full/full/0/default.jpg`;
        }
        return {
          ...record,
          imageUrl,
          source: 'harvard'
        };
      });
    return artworksWithImages;
  } catch (error) {
    console.error('Error fetching Harvard artworks:', error);
    return [];
  }
};


// Combined fetch function
const fetchArtworks = async (query, filters = {}, sortOption = '') => {
  const [harvardArtworks, metArtworks] = await Promise.all([
    fetchHarvardArtworks(query, filters, sortOption),
    fetchMetArtworks(query, filters, sortOption)
  ]);

  console.log('Combined Artworks:', { harvardArtworks, metArtworks });

  return {
    harvardArtworks,
    metArtworks
  };
};

export { fetchArtworks };
