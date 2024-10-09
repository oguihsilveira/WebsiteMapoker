import React, { useEffect, useState } from "react";
import "./ContentGaleria.css";
import sala_reunioes from "../../../assets/sala-reunioes.jpg";
import jardim from "../../../assets/jardim.jpg";
import ambiente_lazer from "../../../assets/ambiente-lazer.jpg";
import escritorio from "../../../assets/escritorio.jpg";

const ContentGaleria = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openModal = (imageSrc, title) => {
    setSelectedImage(imageSrc);
    setSelectedTitle(title);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
    setSelectedTitle("");
  };

  return (
    <div className="galerias">
      {modalOpen && (
        <div className="modal-overlay">
          <div>
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>
                <b>X</b>
              </button>
              <img src={selectedImage} alt="Imagem Expandida" />
            </div>
            <br />
            <div className="modal-title">{selectedTitle}</div>
          </div>
        </div>
      )}

      <div className="galeria" onClick={() => openModal(sala_reunioes, "Ambiente 1")}>
        <img src={sala_reunioes} alt="" />
        <div className="caption">
          <h2>Ambiente 1</h2>
          <p>Clique para ver!</p>
        </div>
      </div>

      <div className="galeria" onClick={() => openModal(ambiente_lazer, "Ambiente 2")}>
        <img src={ambiente_lazer} alt="" />
        <div className="caption">
          <h2>Ambiente 2</h2>
          <p>Clique para ver!</p>
        </div>
      </div>

      <div className="galeria" onClick={() => openModal(jardim, "Ambiente 3")}>
        <img src={jardim} alt="" />
        <div className="caption">
          <h2>Ambiente 3</h2>
          <p>Clique para ver!</p>
        </div>
      </div>

      <div className="galeria" onClick={() => openModal(sala_reunioes, "Ambiente 4")}>
        <img src={sala_reunioes} alt="" />
        <div className="caption">
          <h2>Ambiente 4</h2>
          <p>Clique para ver!</p>
        </div>
      </div>

      <div className="galeria" onClick={() => openModal(ambiente_lazer, "Ambiente 5")}>
        <img src={ambiente_lazer} alt="" />
        <div className="caption">
          <h2>Ambiente 5</h2>
          <p>Clique para ver!</p>
        </div>
      </div>

      <div className="galeria" onClick={() => openModal(jardim, "Ambiente 6")}>
        <img src={jardim} alt="" />
        <div className="caption">
          <h2>Ambiente 6</h2>
          <p>Clique para ver!</p>
        </div>
      </div>

      <div className="galeria" onClick={() => openModal(sala_reunioes, "Ambiente 7")}>
        <img src={sala_reunioes} alt="" />
        <div className="caption">
          <h2>Ambiente 7</h2>
          <p>Clique para ver!</p>
        </div>
      </div>

      <div className="galeria" onClick={() => openModal(ambiente_lazer, "Ambiente 8")}>
        <img src={ambiente_lazer} alt="" />
        <div className="caption">
          <h2>Ambiente 8</h2>
          <p>Clique para ver!</p>
        </div>
      </div>

      <div className="galeria" onClick={() => openModal(jardim, "Ambiente 9")}>
        <img src={jardim} alt="" />
        <div className="caption">
          <h2>Ambiente 9</h2>
          <p>Clique para ver!</p>
        </div>
      </div>
    </div>
  );
};

export default ContentGaleria;
