import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Biblioteca para decodificar JWT
import './NavbarProdutosLoja.css';
import logo from '../../../assets/logo.png';
import cart_icon from '../../../assets/cart-icon.jpg';

const NavbarProdutosLoja = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clienteNome, setClienteNome] = useState(''); // Nome do cliente
  const navigate = useNavigate();

  // Decodifica o token e obtém o nome do cliente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setClienteNome(decoded.nome); // Define o nome do cliente
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div>
      {isLoading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Realizando logout, aguarde...</p>
        </div>
      )}

      <nav className={'container'}>
        <img src={logo} alt="Logo" className="logo" />
        <ul>
          <li>Bem-vindo, {clienteNome || 'Visitante'}!</li> {/* Exibe o nome do cliente */}
          <li onClick={toggleDrawer}>
            <img src={cart_icon} alt="Carrinho" className="cart" />
          </li>
          <li>
            <button className="btn" onClick={handleLogout}>
              LogOut
            </button>
          </li>
        </ul>
      </nav>

      {isDrawerOpen && (
        <div className="drawer">
          <button className="close-drawer" onClick={toggleDrawer}>
            ×
          </button>
          <p>Carrinho de Compras</p>
        </div>
      )}
    </div>
  );
};

export default NavbarProdutosLoja;