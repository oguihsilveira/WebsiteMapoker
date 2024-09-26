import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NavbarUsuarios.css'
import logo from '../../../../assets/logo.png'
import back_icon from '../../../../assets/back-icon.png'

const NavbarUsuarios = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleBackClick = () => {
    navigate('/cadastros-gerais'); // Navega para a página /cadastros-gerais
  }

  return (
    <nav className={'container'}>
        <img src={logo} alt="Logo" className='logo'/>
        <ul>
            <li onClick={handleBackClick}><img src={back_icon} alt="Voltar" className='back'/></li>
            <li>Usuários</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default NavbarUsuarios