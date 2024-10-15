import React, { useEffect, useState } from "react";
import "./ContentGaleria.css";
import sala_reunioes from "../../../assets/sala-reunioes.jpg";
import jardim from "../../../assets/jardim.jpg";
import ambiente_lazer from "../../../assets/ambiente-lazer.jpg";
import escritorio from "../../../assets/escritorio.jpg";

const ContentGaleria = () => {
  const images = [
    { src: sala_reunioes, title: "Ambiente 1" },
    { src: ambiente_lazer, title: "Ambiente 2" },
    { src: jardim, title: "Ambiente 3" },
    { src: escritorio, title: "Ambiente 4" },
    { src: escritorio, title: "Ambiente 4" },
    { src: jardim, title: "Ambiente 3" },
    // Adicione mais imagens aqui se necessário
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="galerias">
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>
                <b>X</b>
              </button>
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
              />
            </div>
            <br />
            <div className="modal-title">{images[currentIndex].title}</div>
            <button className="prev-button" onClick={prevImage}>
              &#10094;
            </ button>
            <button className="next-button" onClick={nextImage}>
              &#10095;
            </button>
          </div>
        </div>
      )}

      {images.map((image, index) => (
        <div
          key={index}
          className="galeria"
          onClick={() => openModal(index)}
        >
          <img src={image.src} alt={image.title} />
          <div className="caption">
            <h2>{image.title}</h2>
            <p>Clique para ver!</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentGaleria;