import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ContentProdutoEspecifico.css';

export default function ContentProdutoEspecifico() {
  const { codigo } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  const [pedido, setPedido] = useState({
    item: '',
    destinatario: '',
    endereco: '',
    tipo_pgto: '',
    data_compra: '', // A data vai ser preenchida com a data atual
    valor_compra: '',
    cod_produto: codigo,
    cod_cliente: '',
  });

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/produtos/${codigo}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Dados do produto:', response.data); // Verifique a estrutura e valores

        setProduto(response.data);
        setPedido((prevState) => ({
          ...prevState,
          item: response.data.item,
          valor_compra: response.data.preco_padrao,
          data_compra: new Date().toISOString().split('T')[0], // Define a data atual
        }));
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
        setLoading(false);
      }
    };

    fetchProduto();
  }, [codigo]);

  const calcularPrecoComDesconto = (preco, desconto) => {
    if (!preco) return '0.00';
    if (!desconto || parseFloat(desconto) <= 0) return parseFloat(preco).toFixed(2);

    return (preco * (1 - desconto / 100)).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPedido((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/pedidos', pedido, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Pedido realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao realizar pedido:', error);
      alert('Erro ao realizar pedido.');
    }
  };

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
            <div className="product-info">
              <h2>{produto.item}</h2>
              <p className="product-type">Tipo: {produto.tipo}</p>
              <p className="product-price">
                Preço original: <s>R${produto.preco_padrao ? parseFloat(produto.preco_padrao).toFixed(2) : '0.00'}</s>
              </p>
              <p className="product-price">
                Preço com desconto: R$
                {calcularPrecoComDesconto(produto.preco_padrao, produto.desconto)}
              </p>
              <p className="product-description">Descrição: {produto.observacoes}</p>
            </div>
          </div>

          <form className="pedido-form" onSubmit={handleSubmit}>
            <h3>Realizar Pedido</h3>
            <div className="form-group">
              <label htmlFor="destinatario">Destinatário:</label>
              <input
                type="text"
                id="destinatario"
                name="destinatario"
                value={pedido.destinatario}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endereco">Endereço:</label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={pedido.endereco}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tipo_pgto">Tipo de Pagamento:</label>
              <select
                id="tipo_pgto"
                name="tipo_pgto"
                value={pedido.tipo_pgto}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Boleto Bancário">Boleto Bancário</option>
                <option value="Pix">Pix</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="data_compra">Data da Compra:</label>
              <input
                type="date"
                id="data_compra"
                name="data_compra"
                value={pedido.data_compra}
                onChange={handleInputChange}
                required
                readOnly
              />
            </div>
            <button type="submit" className="submit-btn">
              Enviar ao Carrinho
            </button>
          </form>
        </div>
      ) : (
        <p>Produto não encontrado.</p>
      )}
    </div>
  );
}
