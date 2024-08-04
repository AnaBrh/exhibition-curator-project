import React, { createContext, useContext, useState, useEffect } from "react";

const ExhibitionContext = createContext();

export const ExhibitionProvider = ({ children }) => {
  const [exhibition, setExhibition] = useState(() => {
    const savedExhibition = sessionStorage.getItem("exhibition");
    return savedExhibition ? JSON.parse(savedExhibition) : [];
  });

  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("exhibition", JSON.stringify(exhibition));
  }, [exhibition]);

  const handleOpenModal = (artwork) => {
    setSelectedArtwork(artwork);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedArtwork(null);
    setModalIsOpen(false);
  };

  return (
    <ExhibitionContext.Provider
      value={{
        exhibition,
        setExhibition,
        selectedArtwork,
        modalIsOpen,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </ExhibitionContext.Provider>
  );
};

export const useExhibition = () => useContext(ExhibitionContext);
