const formatDate = (artwork) => {
  return artwork.objectDate || artwork.dated || 'Unknown Date';
};

const formatClassification = (artwork) => {
  return artwork.classification || 'Unknown Classification';
};

const formatDepartment = (artwork) => {
  return artwork.department || 'Unknown Department';
};

const formatMedium = (artwork) => {
  return artwork.medium || 'Unknown Medium';
};

const getMoreInfoUrl = (artwork) => {
  return artwork.url || `https://www.metmuseum.org/art/collection/search/${artwork.objectID}`;
};

export {
  formatDate,
  formatClassification,
  formatDepartment,
  formatMedium,
  getMoreInfoUrl
};
