import axios from 'axios';

const MET_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const HARVARD_API_URL = "https://api.harvardartmuseums.org";
const HARVARD_API_KEY = import.meta.env.VITE_HARVARD_API_KEY;

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
      objectIDs.slice(0, 500).map(id => axios.get(`${MET_API_URL}/objects/${id}`))
    );

    return artworks
      .map(res => ({
        ...res.data,
        source: 'met', 
      }))
      .filter(artwork => artwork.primaryImage);
  } catch (error) {
    console.error('Error fetching Met artworks:', error);
    return [];
  }
};

const fetchHarvardArtworks = async (query, filters = {}, sortOption = '') => {
  try {
    const params = {
      apikey: HARVARD_API_KEY,
      hasimage: 1,
      q: query,
      size: 500,
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

const fetchArtworks = async (query, filters = {}, sortOption = '') => {
  const [harvardArtworks, metArtworks] = await Promise.all([
    fetchHarvardArtworks(query, filters, sortOption),
    fetchMetArtworks(query, filters, sortOption)
  ]);

  console.log('Combined Artworks:', { harvardArtworks, metArtworks });
  
const combinedArtworks = [
  ...harvardArtworks.map(artwork => ({ ...artwork, source: 'harvard' })),
  ...metArtworks.map(artwork => ({ ...artwork, source: 'met' }))
];

return combinedArtworks;
};

export { fetchArtworks };
