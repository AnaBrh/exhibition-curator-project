const getArtistName = (artwork) => {
  if (artwork.artistDisplayName) {
    return artwork.artistDisplayName;
  }
  if (artwork.people && artwork.people.length > 0) {
    return artwork.people[0].name;
  }
  return 'Unknown Artist';
};

export { getArtistName };
