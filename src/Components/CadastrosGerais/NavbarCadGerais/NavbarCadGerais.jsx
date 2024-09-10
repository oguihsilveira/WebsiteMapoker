import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NavbarCadGerais.css'
import logo from '../../../assets/logo.png'
import back_icon from '../../../assets/back-icon.png'


const NavbarCadGerais = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleBackClick = () => {
    navigate('/'); // Navega para a página /cadastrosgerais
  }

  return (
    <nav className={'container'}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li onClick={handleBackClick}><img src={back_icon} alt="Voltar" className='back'/></li>
            <li>financeiro@mapoker.com.br</li>
            <li>Gestão ERP</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default NavbarCadGerais