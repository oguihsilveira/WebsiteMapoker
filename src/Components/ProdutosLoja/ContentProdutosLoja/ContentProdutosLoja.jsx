import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importação para navegação
import { jwtDecode } from 'jwt-decode'; 
import './ContentProdutosLoja.css';

export default function ContentProdutosLoja() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  const navigate = useNavigate(); // Hook para navegação

  // Função para obter o ID do cliente
  const getCodigoCliente = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decodifica o token JWT
        console.log("Token decodificado:", decodedToken); // Depuração do token completo
        return decodedToken.codigo; // Retorna o código do cliente (ID)
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      console.warn("Token não encontrado no localStorage.");
    }
    return null; // Caso o token não exista ou não possa ser decodificado
  };
  

  const CodigoCliente = getCodigoCliente(); // Obtendo o ID do cliente
  console.log("Código do cliente: ",CodigoCliente)

  const filteredProdutos = produtos.filter(item =>
    (item.item && item.item.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.tipo && item.tipo.toLowerCase().includes(searchQuery.toLowerCase()))
  ).reverse();

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = () => {
    axios.get('http://localhost:3000/produtos')
      .then(response => {
        if (Array.isArray(response.data.produtos)) {
          setProdutos(response.data.produtos);
        } else {
          console.error('Formato inesperado da resposta da API:', response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar produtos:', error);
        setLoading(false);
      });
  };

  const updateSuggestions = (query) => {
    const newSuggestions = produtos.filter(item =>
      item.item.toLowerCase().includes(query.toLowerCase()) ||
      item.tipo.toLowerCase().includes(query.toLowerCase())
    ).map(item => item.item);

    setSuggestions(newSuggestions.slice(0, 5));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      updateSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const handleSeeMore = (codigo) => {
    navigate(`/produto/${codigo}`); // Navegação para página do produto específico
  };

  // Função para fazer o pedido
  const handleOrder = (codigo) => {
    navigate(`/produto/${codigo}`); // Navegação para página do produto para fazer o pedido
  };

  return (
    <div className="content-container">
      <h2 className="title">Loja</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Pesquisar por item ou tipo de produto..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />

        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="suggestion-item" 
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="products-grid">
        {loading ? (
          <p>Carregando produtos...</p>
        ) : filteredProdutos.length > 0 ? (
          filteredProdutos.map((item) => (
            <div key={item.codigo} className="product-card">
              <div className="product-image-container">
                <img 
                  src={item.foto} 
                  alt={item.item} 
                  className="product-image" 
                />
              </div>
              <div className="product-info">
                <h3>{item.item}</h3>
                <h4 className="product-type">{item.tipo}</h4>
                <p>De: <s>R${item.preco_padrao ? parseFloat(item.preco_padrao).toFixed(2) : 'N/A'}</s></p>
                <p>
                  Por apenas: R${item.preco_padrao && item.desconto && parseFloat(item.desconto) > 0
                    ? (parseFloat(item.preco_padrao) * (1 - parseFloat(item.desconto) / 100)).toFixed(2)
                    : item.preco_padrao ? parseFloat(item.preco_padrao).toFixed(2) : 'N/A'}
                </p>
              </div>
              <div className="product-buttons">
                {/* Removido o botão Veja Mais */}
                <button 
                  className="order-button" 
                  onClick={() => handleOrder(item.codigo)} // Função de fazer pedido
                >
                  Fazer pedido
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}
