import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ContentProdutoEspecifico.css';

export default function ContentProdutoEspecifico() {
  const { codigo } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        // Obtém o token JWT armazenado no localStorage
        const token = localStorage.getItem('token');

        // Realiza a requisição GET com o header de autenticação
        const response = await axios.get(`http://localhost:3000/produtos/${codigo}`, {
          headers: {
            Authorization: `Bearer ${token}` // Adiciona o token no header
          }
        });
        
        setProduto(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
        setLoading(false);
      }
    };
    
    fetchProduto();
  }, [codigo]);

  return (
    <div className="product-detail-container">
      {loading ? (
        <p>Carregando produto...</p>
      ) : produto ? (
        <div className="product-detail">
          <img src={produto.foto} alt={produto.item} className="product-detail-image" />
          <h2>{produto.item}</h2>
          <p>Tipo: {produto.tipo}</p>
          <p>Preço: R${produto.preco_padrao ? parseFloat(produto.preco_padrao).toFixed(2) : 'N/A'}</p>
          <p>Descrição: {produto.observacoes}</p>
          {/* Adicione mais detalhes aqui conforme necessário */}
        </div>
      ) : (
        <p>Produto não encontrado.</p>
      )}
    </div>
  );
}