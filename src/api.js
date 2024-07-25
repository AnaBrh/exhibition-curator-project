import axios from 'axios';

const MET_API_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const HARVARD_API_BASE_URL = "https://api.harvardartmuseums.org";
const HARVARD_API_KEY = import.meta.env.VITE_HARVARD_API_KEY;

export const searchMetMuseum = async (query) => {
  try {
    const response = await axios.get(`${MET_API_BASE_URL}/search`, {
      params: { q: query, hasImages: true, apikey: import.meta.env.VITE_MET_API_KEY },
    });
    return response.data.objectIDs || [];
  } catch (error) {
    console.error("Error searching the Met Museum API:", error);
    return [];
  }
};

export const getObjectDetails = async (objectId) => {
  try {
    const response = await axios.get(`${MET_API_BASE_URL}/objects/${objectId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching object details from the Met Museum API:",
      error
    );
    return null;
  }
};

export const searchHarvardMuseum = async (query) => {
  try {
    const response = await axios.get(`${HARVARD_API_BASE_URL}/object`, {
      params: { apikey: HARVARD_API_KEY, title: query, hasimage: true },
    });
    return response.data.records || [];
  } catch (error) {
    console.error("Error searching the Harvard Museum API:", error);
    return [];
  }
};
