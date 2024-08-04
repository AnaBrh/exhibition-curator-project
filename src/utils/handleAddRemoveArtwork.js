export const isArtworkInExhibition = (artwork, exhibitionList, source) => {
  return exhibitionList.some(
    (item) =>
      (source === "harvard" && item.objectid === artwork.objectid) ||
      (source === "met" && item.objectID === artwork.objectID)
  );
};

export const handleAddRemoveArtwork = (artwork, source, setExhibition) => {
  let exhibitionList = JSON.parse(sessionStorage.getItem("exhibition")) || [];

  const isArtworkInExhibition = exhibitionList.some(
    (item) =>
      (source === "harvard" && item.objectid === artwork.objectid) ||
      (source === "met" && item.objectID === artwork.objectID)
  );

  const action = isArtworkInExhibition ? "remove" : "add";

  if (action === "add") {
    exhibitionList.push({ ...artwork, source });
  } else if (action === "remove") {
    exhibitionList = exhibitionList.filter(
      (item) =>
        !(source === "harvard" && item.objectid === artwork.objectid) &&
        !(source === "met" && item.objectID === artwork.objectID)
    );
  }

  sessionStorage.setItem("exhibition", JSON.stringify(exhibitionList));
  setExhibition(exhibitionList); 
};
