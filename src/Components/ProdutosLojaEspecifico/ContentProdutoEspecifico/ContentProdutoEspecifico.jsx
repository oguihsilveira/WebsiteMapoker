import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Corrigido para usar 'jwt-decode' corretamente
import './ContentProdutoEspecifico.css';

// Função para obter dados do cliente
const getDadosCliente = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decodifica o token JWT
      console.log('Token decodificado:', decodedToken); // Depuração do token completo
      return {
        codigo: decodedToken.codigo, // Retorna o código do cliente (ID)
        nome: decodedToken.nome, // Nome do cliente
        empresa: decodedToken.empresa, // Empresa do cliente
      };
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
  } else {
    console.warn('Token não encontrado no localStorage.');
  }
  return null; // Caso o token não exista ou não possa ser decodificado
};

export default function ContentProdutoEspecifico() {
  const { codigo } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  const [pedido, setPedido] = useState(() => {
    const dadosCliente = getDadosCliente();
    return {
      item: '',
      destinatario: dadosCliente ? `${dadosCliente.nome} - ${dadosCliente.empresa}` : '',
      endereco: '',
      tipo_pgto: '',
      qntd_parcelas: 1,
      data_compra: new Date().toISOString().split('T')[0], // Define a data da compra como a data atual
      valor_compra: '',
      quantidade: 1,
      status: 'Em Andamento', // Adiciona o status inicial
      cod_produto: parseInt(codigo, 10), // Converte o código para número
      cod_cliente: dadosCliente ? dadosCliente.codigo : null,
    };
  });   

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token de autenticação não encontrado.');
        }

        const response = await axios.get(`http://localhost:3000/produtos/${codigo}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProduto(response.data);
        setPedido((prevState) => ({
          ...prevState,
          item: response.data.item,
          valor_compra: response.data.preco_padrao,
          data_compra: new Date().toISOString().split('T')[0],
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

  // Função para calcular o valor das parcelas
  const calcularParcelas = (valorTotal, parcelas) => {
    const valorParcela = valorTotal / parcelas;
    return {
      valorParcela: valorParcela.toFixed(2),
      valorTotal: valorTotal.toFixed(2),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado.');
      }

      await axios.post('http://localhost:3000/pedidos', pedido, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Pedido realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao realizar pedido:', error);
      alert('Erro ao realizar pedido.');
    }
  };

  // Atualiza o valor da compra com base na quantidade de parcelas
  useEffect(() => {
    if (pedido.tipo_pgto === 'Cartão de Crédito') {
      const precoTotal = pedido.quantidade * produto.preco_padrao;
      const { valorParcela, valorTotal } = calcularParcelas(precoTotal, pedido.qntd_parcelas);
      setPedido((prevState) => ({
        ...prevState,
        valor_compra: valorTotal, // Atualiza o valor total
        valor_parcela: valorParcela, // Atualiza o valor da parcela
      }));
    }
  }, [pedido.quantidade, pedido.qntd_parcelas, produto]);

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
                De: <s>R${produto.preco_padrao ? parseFloat(produto.preco_padrao).toFixed(2) : '0.00'}</s>
              </p>
              <p className="product-price">
                Por apenas: R$
                {calcularPrecoComDesconto(produto.preco_padrao, produto.desconto)}
              </p>
              <p className="product-price">Quantidade disponível: {produto.quantidade} </p>
              <p className="product-description">Descrição: {produto.observacoes}</p>
            </div>
          </div>

          <form className="pedido-form" onSubmit={handleSubmit}>
            <h3>Realizar Pedido</h3>
            {/* Campos do formulário */}
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
              <label htmlFor="quantidade">Quantidade:</label>
              <select
                id="quantidade"
                name="quantidade"
                value={pedido.quantidade}
                onChange={(e) => {
                  const quantidade = parseInt(e.target.value, 10);
                  const novoValorCompra = quantidade * produto.preco_padrao;
                  setPedido((prevState) => ({
                    ...prevState,
                    quantidade,
                    valor_compra: novoValorCompra.toFixed(2),
                  }));
                }}
                required
              >
                {Array.from({ length: produto.quantidade }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
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
              <label htmlFor="qntd_parcelas">Quantidade de Parcelas:</label>
              <select
                id="qntd_parcelas"
                name="qntd_parcelas"
                value={pedido.qntd_parcelas}
                onChange={handleInputChange}
                disabled={pedido.tipo_pgto !== 'Cartão de Crédito'}
                required
              >
                <option value={1}>1x</option>
                <option value={3}>3x</option>
                <option value={6}>6x</option>
                <option value={12}>12x</option>
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

            <div className="payment-summary">
              <p>Valor total: R${pedido.valor_compra}</p>
              {pedido.tipo_pgto === 'Cartão de Crédito' && (
                <p>Valor da parcela: R${pedido.valor_parcela}</p>
              )}
            </div>

            <button type="submit" className="submit-btn">Finalizar Pedido</button>
          </form>

        </div>
      ) : (
        <p>Produto não encontrado.</p>
      )}
    </div>
  );
}
