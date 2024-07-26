import axios from 'axios';

const MET_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const HARVARD_API_URL = "https://api.harvardartmuseums.org";
const HARVARD_API_KEY = import.meta.env.VITE_HARVARD_API_KEY;

// Fetch Harvard Artworks
const fetchHarvardArtworks = async (query, filters = {}, sortOption = '') => {
  try {
    // Construct the query parameters
    const params = {
      apikey: HARVARD_API_KEY,
      hasImages: 0, // images not showing properly
      q: query,
      ...filters,
      sort: sortOption,
    };

    // Log the parameters and the constructed URL
    console.log('Harvard API Request Params:', params);


    // Make the API request
    const response = await axios.get(`${HARVARD_API_URL}/object`, { params });

    // Log the response
    console.log('Harvard API Response:', response);

    // Return the records or an empty array if none are found
    console.log(response, "<--response")
    return response.data.records || [];
  } catch (error) {
    console.error('Error fetching Harvard artworks:', error);
    return [];
  }
};

// Fetch Met Artworks
const fetchMetArtworks = async (query, filters = {}, sortOption = '') => {
  try {
    const searchResponse = await axios.get(`${MET_API_URL}/search`, {
      params: {
        q: query,
        hasImages: true,
        ...filters, // Add filters here if applicable
        sort: sortOption, // Add sort option here if applicable
      }
    });
    const objectIDs = searchResponse.data.objectIDs || [];
    const artworks = await Promise.all(
      objectIDs.slice(0, 50).map(id => axios.get(`${MET_API_URL}/objects/${id}`))
    );
    return artworks.map(res => res.data);
  } catch (error) {
    console.error('Error fetching Met artworks:', error);
    return [];
  }
};

// Combined fetch function
const fetchArtworks = async (query, filters = {}, sortOption = '') => {
  const [harvardArtworks, metArtworks] = await Promise.all([
    fetchHarvardArtworks(query, filters, sortOption),
    fetchMetArtworks(query, filters, sortOption)
  ]);

  return {
    harvardArtworks,
    metArtworks
  };
};

export { fetchArtworks };
