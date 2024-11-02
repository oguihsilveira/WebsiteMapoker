import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavbarUsuarios.css';
import logo from '../../../../assets/logo.png';
import back_icon from '../../../../assets/back-icon.png';

const NavbarUsuarios = () => {
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate(); // Hook para navegação

  const handleBackClick = () => {
    navigate('/cadastros-gerais'); // Navega para a página /cadastros-gerais
  }

  // Função de Logout
  const handleLogout = () => {
    setIsLoading(true); // Ativa a tela de carregamento
    setTimeout(() => {
      localStorage.removeItem('token'); // Remove o token do localStorage
      setIsLoading(false); // Desativa a tela de carregamento
      navigate('/'); // Navega para a página inicial
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
        <img src={logo} alt="Logo" className='logo' />
        <ul>
          <li onClick={handleBackClick}>
            <img src={back_icon} alt="Voltar" className='back' />
          </li>
          <li>Usuários</li>
          <li>
            <button className='btn' onClick={handleLogout}>LogOut</button> {/* Botão de Logout */}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavbarUsuarios;