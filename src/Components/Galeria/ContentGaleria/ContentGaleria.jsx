import React, { useEffect } from "react";
import "./ContentGaleria.css";
import sala_reunioes from "../../../assets/sala-reunioes.jpg";
import jardim from "../../../assets/jardim.jpg";
import ambiente_lazer from "../../../assets/ambiente-lazer.jpg";
import escritorio from "../../../assets/escritorio.jpg";

const ContentGaleria = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Move o scroll para o topo
  }, []);

  return (
    <div className="galerias">

    {/* 1a linha */}
        {/* item 1 */}
      <div className="galeria">
        <img src={sala_reunioes} alt="" />
        <div className="caption">
          <p>Clique para ver!</p>
        </div>
      </div>
        {/* item 2 */}
      <div className="galeria">
        <img src={ambiente_lazer} alt="" />
        <div className="caption">
            <p>Clique para ver!</p>
        </div>
      </div>
        {/* item 3 */}
      <div className="galeria">
        <img src={jardim} alt="" />
        <div className="caption">
            <p>Clique para ver!</p>
        </div>
      </div>

    {/* 2a linha */}
    <div className="galeria">
        <img src={sala_reunioes} alt="" />
        <div className="caption">
          <p>Clique para ver!</p>
        </div>
      </div>
        {/* item 2 */}
      <div className="galeria">
        <img src={ambiente_lazer} alt="" />
        <div className="caption">
            <p>Clique para ver!</p>
        </div>
      </div>
        {/* item 3 */}
      <div className="galeria">
        <img src={jardim} alt="" />
        <div className="caption">
            <p>Clique para ver!</p>
        </div>
      </div>

    {/* 3a linha */}
    <div className="galeria">
        <img src={sala_reunioes} alt="" />
        <div className="caption">
          <p>Clique para ver!</p>
        </div>
      </div>
        {/* item 2 */}
      <div className="galeria">
        <img src={ambiente_lazer} alt="" />
        <div className="caption">
            <p>Clique para ver!</p>
        </div>
      </div>
        {/* item 3 */}
      <div className="galeria">
        <img src={jardim} alt="" />
        <div className="caption">
            <p>Clique para ver!</p>
        </div>
      </div>
    {/* Galerias */}
    </div>
  );
};

export default ContentGaleria;
