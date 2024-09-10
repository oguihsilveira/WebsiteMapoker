import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NavbarProdutosFornecedores.css'
import logo from '../../../assets/logo.png'
import back_icon from '../../../assets/back-icon.png'

const NavbarProdutosFornecedores = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleBackClick = () => {
    navigate('/cadastrosgerais'); // Navega para a página /cadastrosgerais
  }

  return (
    <nav className={'container'}>
        <img src={logo} alt="Logo" className='logo'/>
        <ul>
            <li onClick={handleBackClick}><img src={back_icon} alt="Voltar" className='back'/></li>
            <li>Produtos de Fornecedores</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default NavbarProdutosFornecedores