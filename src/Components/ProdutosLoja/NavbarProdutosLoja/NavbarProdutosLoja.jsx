import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NavbarProdutosLoja.css'
import logo from '../../../assets/logo.png'
import back_icon from '../../../assets/back-icon.png'

const NavbarProdutosLoja = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleBackClick = () => {
    navigate('/login-clientes'); // Navega para a página /cadastrosgerais
  }

  return (
    <nav className={'container'}>
        <img src={logo} alt="Logo" className='logo'/>
        <ul>
            <li onClick={handleBackClick}><img src={back_icon} alt="Voltar" className='back'/></li>
            <li>Loja</li>
        </ul>
    </nav>
  )
}

export default NavbarProdutosLoja