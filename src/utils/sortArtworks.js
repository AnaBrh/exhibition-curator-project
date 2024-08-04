import { getArtistName } from "./getArtistName";

export const sortArtworks = (artworks, option) => {
  return [...artworks].sort((a, b) => {
    switch (option) {
      case "title-asc":
        return (a.title || "").localeCompare(b.title || "");
      case "title-desc":
        return (b.title || "").localeCompare(a.title || "");
      case "date-asc":
        return (
          new Date(a.dateend || a.objectEndDate) -
          new Date(b.dateend || b.objectEndDate)
        );
      case "date-desc":
        return (
          new Date(b.dateend || b.objectEndDate) -
          new Date(a.dateend || a.objectEndDate)
        );
      case "artist-asc":
        return (getArtistName(a) || "zzzzz").localeCompare(
          getArtistName(b) || "zzzzz"
        );
      case "artist-desc":
        return (getArtistName(b) || "zzzzz").localeCompare(
          getArtistName(a) || "zzzzz"
        );
      case "relevance":
      default:
        return 0;
    }
  });
};
