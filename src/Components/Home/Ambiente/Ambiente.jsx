import React from 'react'
import { useNavigate } from 'react-router-dom' // Importa o useNavigate
import './Ambiente.css'
import ambiente_1 from '../../../assets/ambiente-1.png'
import ambiente_2 from '../../../assets/ambiente-2.png'
import ambiente_3 from '../../../assets/ambiente-3.png'
import ambiente_4 from '../../../assets/ambiente-4.png'
import white_arrow from '../../../assets/white-arrow.png'

const Ambiente = () => {
  const navigate = useNavigate(); // Define o hook useNavigate

  const handleNavigate = () => {
    navigate('/galeria'); // Faz a navegação para a rota /galeria
  }

  return (
    <div className='ambiente'>
        <div className="gallery">
            <img src={ambiente_1} alt="" />
            <img src={ambiente_2} alt="" />
            <img src={ambiente_3} alt="" />
            <img src={ambiente_4} alt="" />
        </div>
        <button className='btn dark-btn' onClick={handleNavigate}>Veja mais aqui
            <img src={white_arrow} alt="" />
        </button>
    </div>
  )
}

export default Ambiente;