import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentProdutosLoja.css';

export default function ContentProdutosLoja() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Filtragem de produtos com base na pesquisa
  const filteredProdutos = produtos.filter(item =>
    (item.item && item.item.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.tipo && item.tipo.toLowerCase().includes(searchQuery.toLowerCase()))
  ).reverse();

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para buscar produtos
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

  // Função para atualizar as sugestões com base na pesquisa
  const updateSuggestions = (query) => {
    const newSuggestions = produtos.filter(item =>
      item.item.toLowerCase().includes(query.toLowerCase()) ||
      item.tipo.toLowerCase().includes(query.toLowerCase())
    ).map(item => item.item);

    setSuggestions(newSuggestions.slice(0, 5)); // Exibe até 5 sugestões
  };

  // Atualizar a pesquisa e as sugestões conforme o usuário digita
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      updateSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  // Função para selecionar uma sugestão
  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
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
        
        {/* Exibir sugestões */}
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
                <p>De: R${item.preco_antigo ? item.preco_antigo.toFixed(2) : 'N/A'}</p>
                <p>Por apenas: R${item.preco_atual ? item.preco_atual.toFixed(2) : 'N/A'}</p>
              </div>
              <div className="product-buttons">
                <button className="see-more-button">Veja mais</button>
                <button className="order-button">Fazer pedido</button>
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