import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NavbarProdutoEspecifico.css'
import logo from '../../../assets/logo.png'
import cart_icon from '../../../assets/cart-icon.jpg' // Adicione o ícone de carrinho
import back_icon from '../../../assets/back-icon.png';

const NavbarProdutoEspecifico = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen); // Alterna o estado da drawer
  }

  const handleBackClick = () => {
    navigate('/produtos-loja'); // Navega para a página /cadastros-gerais
  }

  // Função de Logout
  const handleLogout = () => {
    setIsLoading(true); // Ativa a tela de carregamento
    setTimeout(() => {
      localStorage.removeItem('token'); // Remove o token do localStorage
      setIsLoading(false); // Desativa a tela de carregamento
      navigate('/'); // Navega para a página inicial (ou onde preferir)
    }, 1500); // Define o tempo de carregamento em 1.5s
  }

  return (
    <div>
      {/* Tela de carregamento condicional */}
      {isLoading && (
        <div className="loading-screen">
          <div className="spinner"></div> {/* Círculo de loading */}
          <p>Realizando logout, aguarde...</p>
        </div>
      )}
      
      <nav className={'container'}>
          <img src={logo} alt="Logo" className='logo'/>
          <ul>
            <li onClick={handleBackClick}><img src={back_icon} alt="Voltar" className='back' /></li>
            <li>Loja</li>
            <li onClick={toggleDrawer}>
              <img src={cart_icon} alt="Carrinho" className='cart'/> {/* Ícone de carrinho */}
            </li>
            <li>
              <button className='btn' onClick={handleLogout}>LogOut</button> {/* Botão de Logout */}
            </li>
          </ul>
      </nav>

      {/* Drawer lateral */}
      {isDrawerOpen && (
        <div className="drawer">
          <button className="close-drawer" onClick={toggleDrawer}>×</button>
          <p>Carrinho de Compras</p>
          {/* Aqui você pode adicionar conteúdo do carrinho */}
        </div>
      )}
    </div>
  )
}

export default NavbarProdutoEspecifico