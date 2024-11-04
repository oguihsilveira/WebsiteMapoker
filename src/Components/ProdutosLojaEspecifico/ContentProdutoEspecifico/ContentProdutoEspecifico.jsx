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
          const response = await axios.get(`http://localhost:3000/produtos/${codigo}`);
            setProduto(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao carregar produto:', error);
            setLoading(false);
        }
    };
    fetchProduto();
}, [codigo]);
  
  const fetchProduto = () => {
    axios.get(`http://localhost:3000/produtos/${codigo}`)
      .then(response => {
        setProduto(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar produto:', error);
        setLoading(false);
      });
  };

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
