import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentProdutosLoja.css';

export default function ContentProdutosLoja() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtragem de produtos com base na pesquisa
  const filteredProdutos = produtos.filter(item =>
    (item.item && item.item.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.codigo && item.codigo.toString().toLowerCase().includes(searchQuery.toLowerCase()))
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

  return (
    <div className="content-container">
      <h2 className="title">Produtos Disponíveis</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Pesquisar por Item ou código do produto..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Item</th>
            <th>Tipo</th>
            <th>Preço Atual/Unidade (R$)</th>
            <th>Preço Antigo/Unidade (R$)</th>
            <th>Status</th>
            <th>Quantidade</th>
            <th>Foto</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="9">Carregando produtos...</td></tr>
          ) : filteredProdutos.length > 0 ? (
            filteredProdutos.map((item) => (
              <tr key={item.codigo}>
                <td>{item.codigo}</td>
                <td>{item.item}</td>
                <td>{item.tipo}</td>
                <td>R${item.preco_atual ? item.preco_atual.toFixed(2) : 'N/A'}</td>
                <td>R${item.preco_antigo ? item.preco_antigo.toFixed(2) : 'N/A'}</td>
                <td>{item.status}</td>
                <td>{item.quantidade}</td>
                <td>
                  {item.foto ? (
                    <img
                      src={item.foto}
                      alt={item.item}
                      className="foto-produto"
                      onClick={() => window.open(item.foto, '_blank')}
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <span>Nenhuma foto disponível</span>
                  )}
                </td>
                <td>{item.observacoes}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="9">Nenhum produto encontrado.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
