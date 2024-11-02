import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NavbarCadGerais.css'
import logo from '../../../assets/logo.png'
import back_icon from '../../../assets/back-icon.png'

const NavbarCadGerais = () => {
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate(); // Hook para navegação

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
          <img src={logo} alt="" className='logo'/>
          <ul>
              <li>financeiro@mapoker.com.br</li>
              <li>Gestão da Empresa</li>
              <li>
                <button className='btn' onClick={handleLogout}>LogOut</button> {/* Botão de Logout */}
              </li>
          </ul>
      </nav>
    </div>
  )
}

export default NavbarCadGerais;