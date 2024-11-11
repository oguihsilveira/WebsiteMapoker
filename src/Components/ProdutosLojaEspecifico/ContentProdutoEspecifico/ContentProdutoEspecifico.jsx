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
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/produtos/${codigo}`, {
          headers: { Authorization: `Bearer ${token}` }
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
          <div className="product-image-wrapper">
            <img 
              src={`http://localhost:3000/uploads/${produto.foto}`} 
              alt={produto.item} 
              className="product-detail-image" 
            />
          </div>
          <div className="product-info">
            <h2>{produto.item}</h2>
            <p className="product-type">Tipo: {produto.tipo}</p>
            <p className="product-price">Preço: R${produto.preco_padrao ? parseFloat(produto.preco_padrao).toFixed(2) : 'N/A'}</p>
            <p className="product-description">Descrição: {produto.observacoes}</p>
            <button className="add-to-cart-btn">Adicionar ao Carrinho</button>
          </div>
        </div>
      ) : (
        <p>Produto não encontrado.</p>
      )}
    </div>
  );
}
