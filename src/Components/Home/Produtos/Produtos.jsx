import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate
import './Produtos.css';
import rolamento from '../../../assets/rolamento.jpg';
import rebolo from '../../../assets/rebolo.jpg';
import correia from '../../../assets/correia.jpg';

import rolamento_icon from '../../../assets/rolamento-icon.png';
import rebolo_icon from '../../../assets/rebolo-icon.png';
import correia_icon from '../../../assets/correia-icon.png';
import white_arrow from '../../../assets/white-arrow.png';

const Produtos = () => {
  const navigate = useNavigate(); // Define o hook useNavigate

  const handleNavigate = () => {
    navigate('/login-clientes'); // Faz a navegação para a rota /galeria
  };

  return (
    <div className='produtos'>
      <div className='produtos-lista'>
        <div className='produto'>
          <img src={rolamento} alt="" />
          <div className='caption'>
            <img src={rolamento_icon} alt="" />
            <p>Rolamentos</p>
          </div>
        </div>
        <div className='produto'>
          <img src={rebolo} alt="" />
          <div className='caption'>
            <img src={rebolo_icon} alt="" />
            <p>Rebolos</p>
          </div>
        </div>
        <div className='produto'>
          <img src={correia} alt="" />
          <div className='caption'>
            <img src={correia_icon} alt="" />
            <p>Correias</p>
          </div>
        </div>
      </div>
      <div>
        <button className='btn dark-btn' onClick={handleNavigate}>
          Veja mais aqui
          <img src={white_arrow} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Produtos;