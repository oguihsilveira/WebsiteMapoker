import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Importando a biblioteca jwt-decode
import { AiOutlineCheck } from 'react-icons/ai';  // Ícone de check da biblioteca react-icons
import './NavbarProdutosLoja.css';
import logo from '../../../assets/logo.png';
import cart_icon from '../../../assets/cart-icon.jpg';
import back_icon from '../../../assets/back-icon.png';

const NavbarProdutosLoja = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clienteNome, setClienteNome] = useState(''); // Nome do cliente
  const [cartItems, setCartItems] = useState([]);  // Itens do carrinho
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

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token não encontrado no localStorage");
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      console.log("Dados do cliente decodificados:", decodedToken);
  
      const response = await axios.get('http://localhost:3000/pedidos', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Pedidos recebidos:", response.data);
  
      if (response.data?.pedidos && Array.isArray(response.data.pedidos)) {
        // Filtra os pedidos verificando tanto o código do cliente quanto o status "em andamento"
        const filteredPedidos = response.data.pedidos.filter((pedido) => 
          pedido.cod_cliente === decodedToken.codigo && pedido.status === "em andamento"
        );
        setCartItems(filteredPedidos);
      } else {
        console.error("Formato inesperado de resposta:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar itens do carrinho:", error);
    }
  };  

  const handleUpdateStatus = async (codigo) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token não encontrado no localStorage");
        return;
      }
  
      const response = await axios.put(
        `http://localhost:3000/carrinho/pedidos/${codigo}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert("Pedido enviado com sucesso!");  // Exibe a resposta do servidor
  
      // Atualiza os itens do carrinho após alterar o status
      fetchCartItems();
  
    } catch (error) {
      console.error("Erro ao atualizar o status do pedido:", error);
      alert('Não foi possível atualizar o status do pedido.');
    }
  };  

  const handleRemoveItem = async (codigo) => {
    try {
      await axios.delete(`http://localhost:3000/carrinho/pedidos/${codigo}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setCartItems((prevItems) => prevItems.filter((item) => item.codigo !== codigo));

      alert('Item removido do carrinho!');
    } catch (error) {
      console.error("Erro ao remover item:", error);
      alert('Não foi possível remover o item. Tente novamente.');
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
          <li>Bem-vindo, {clienteNome || 'Visitante'}!</li> {/* Exibe o nome do cliente */}
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
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <span className="cart-item-name">{item.item}</span>
                      <span className="cart-item-quantity">Qntd: {item.quantidade}</span>
                    </div>
                    <span className="cart-item-product-name">{item.produto.nome}</span>
                    <div className="cart-item-extra">
                      <span className="cart-item-price">R$ {item.valor_compra.toFixed(2)}</span>
                      <span className="cart-item-installments">Parcelas: {item.qntd_parcelas || 1}x</span>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <button
                      className="update-status"
                      onClick={() => handleUpdateStatus(item.codigo)}
                    >
                      <AiOutlineCheck size={20} />
                    </button>
                    <button
                      className="remove-item"
                      onClick={() => handleRemoveItem(item.codigo)}
                    >
                      X
                    </button>
                  </div>
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

export default NavbarProdutosLoja;

/* import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NavbarProdutosLoja.css';
import logo from '../../../assets/logo.png';
import cart_icon from '../../../assets/cart-icon.jpg';
import back_icon from '../../../assets/back-icon.png';

const NavbarProdutosLoja = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
      localStorage.removeItem('access_token');
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:3000/pedidos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("Dados recebidos:", response.data); // Verificar a estrutura do retorno
      if (response.data?.pedidos && Array.isArray(response.data.pedidos)) {
        setCartItems(response.data.pedidos); // Atualiza o estado com itens
      } else {
        console.error("Formato inesperado de resposta:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar itens do carrinho:", error);
    }
  };

  // UseEffect para buscar itens do carrinho ao abrir o drawer
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
                    src={`http://localhost:3000${item.foto}`} 
                    alt={item.item_produto} 
                    className="cart-item-img" 
                  />
                  <span className="cart-item-name">{item.item_produto}</span>
                  <span className="cart-item-price">R$ {item.valor_compra.toFixed(2)}</span>
                  <button
                    className="remove-item"
                    onClick={() => console.log(`Remover item ${item.pedido_id}`)}
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

export default NavbarProdutosLoja; */