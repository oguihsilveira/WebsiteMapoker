import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NavbarProdutoEspecifico.css';
import logo from '../../../assets/logo.png';
import cart_icon from '../../../assets/cart-icon.jpg';
import back_icon from '../../../assets/back-icon.png';

const NavbarProdutoEspecifico = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleBackClick = () => {
    navigate('/produtos-loja');
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token não encontrado no localStorage");
        return;
      }
      console.log("Token usado para buscar itens do carrinho:", token);
  
      const response = await axios.get('http://localhost:3000/pedidos', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data?.pedidos && Array.isArray(response.data.pedidos)) {
        setCartItems(response.data.pedidos);
      } else {
        console.error("Formato inesperado de resposta:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar itens do carrinho:", error);
    }
  };    

  const handleRemoveItem = async (codigo) => {
    try {
      await axios.delete(`http://localhost:3000/pedidos/${codigo}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.codigo !== codigo));
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      fetchCartItems();
    }
  }, [isDrawerOpen]);

  return (
    <div>
      {isLoading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Realizando logout, aguarde...</p>
        </div>
      )}

      <nav className="container">
        <img src={logo} alt="Logo" className="logo" />
        <ul>
          <li onClick={handleBackClick}>
            <img src={back_icon} alt="Voltar" className="back" />
          </li>
          <li>Loja</li>
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
          <button className="close-drawer" onClick={toggleDrawer}>×</button>
          <h2>Carrinho de Compras</h2>

          {cartItems.length > 0 ? (
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img 
                    src={`http://localhost:3000/uploads/${item.produto.foto}`} 
                    alt={item.item_produto} 
                    className="cart-item-img" 
                  />
                  <span className="cart-item-name">{item.item_produto}</span>
                  <span className="cart-item-price">R$ {item.valor_compra.toFixed(2)}</span>
                  <button
                    className="remove-item"
                    onClick={() => handleRemoveItem(item.codigo)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>O carrinho está vazio ou os dados não foram carregados corretamente.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarProdutoEspecifico;