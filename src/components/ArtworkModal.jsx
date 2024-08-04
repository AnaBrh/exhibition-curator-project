import React from "react";
import Modal from "react-modal";
import { getArtistName } from "../utils/getArtistName";
import {
  formatDate,
  formatClassification,
  formatDepartment,
  formatMedium,
  getMoreInfoUrl,
} from "../utils/formatting";
import {
  handleAddRemoveArtwork,
  isArtworkInExhibition,
} from "../utils/handleAddRemoveArtwork";
import { useExhibition } from "../ExhibitionContext";

Modal.setAppElement("#root");

const ArtworkModal = ({ isOpen, onRequestClose, artwork }) => {
  const { exhibition, setExhibition } = useExhibition();

  if (!artwork) return null;

  const imageUrl =
    artwork.primaryImage || artwork.imageUrl || artwork.primaryimageurl;

  const source = artwork.source || "unknown";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Artwork Details"
      appElement={document.getElementById("root")}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "90vh",
          maxWidth: "1200px",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#242424",
        },
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.75" },
      }}
    >
      <section className="modal-body">
        <div className="modal-image">
          <img src={imageUrl} alt={artwork.title} />
        </div>
        <div className="modal-info">
          <section id="top-modal-info">
            <h1 id="modal-h1">{artwork.title}</h1>
            <h2 id="modal-h2">{getArtistName(artwork)}</h2>
          </section>
          <p>
            <strong>Date:</strong> {formatDate(artwork)}
          </p>
          <p>
            <strong>Medium:</strong> {formatMedium(artwork)}
          </p>
          <p>
            <strong>Classification:</strong> {formatClassification(artwork)}
          </p>
          <p>
            <strong>Department:</strong> {formatDepartment(artwork)}
          </p>
          <a
            href={getMoreInfoUrl(artwork)}
            target="_blank"
            rel="noopener noreferrer"
            id="modal-link"
            style={{fontWeight: "bold"}}
          >
            More Info
          </a>
        </div>
      </section>
      <section className="modal-footer">
        <button
          onClick={() => handleAddRemoveArtwork(artwork, source, setExhibition)}
        >
          {isArtworkInExhibition(artwork, exhibition, source)
            ? "Remove from Exhibition"
            : "Add to Exhibition"}
        </button>
        <button onClick={onRequestClose}>Close</button>
      </section>
    </Modal>
  );
};

export default ArtworkModal;
