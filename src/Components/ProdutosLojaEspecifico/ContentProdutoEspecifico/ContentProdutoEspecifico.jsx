import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook de navegação
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
      /* console.log('Token decodificado:', decodedToken); // Depuração do token completo */
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
  const navigate = useNavigate(); // Inicialize o hook de navegação
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
      qntd_parcelas: '',
      data_compra: new Date().toISOString().split('T')[0], // Define a data da compra como a data atual
      valor_compra: '',
      valor_parcela: '',
      quantidade: '',
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
    
        const produto = response.data;
        const precoComDesconto = calcularPrecoComDesconto(produto.preco_padrao, produto.desconto);
    
        setProduto(produto);
        setPedido((prevState) => ({
          ...prevState,
          item: produto.item,
          valor_compra: precoComDesconto, // Inicia o valor com o preço com desconto
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
    setPedido((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

      const { codigo, ...pedidoSemCodigo } = pedido;

      const pedidoFormatado = {
        ...pedidoSemCodigo,
        valor_compra: parseFloat(pedidoSemCodigo.valor_compra).toFixed(2),
        valor_parcela: pedidoSemCodigo.valor_parcela ? parseFloat(pedidoSemCodigo.valor_parcela).toFixed(2) : '',
      };

      console.log('Pedido enviado:', pedidoFormatado);

      const response = await axios.post('http://localhost:3000/pedidos', pedidoFormatado, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Resposta da API:', response.data);
      alert('Pedido enviado ao carrinho!');

      // Redirecione o usuário após o sucesso
      navigate('/produtos-loja'); // Substitua '/meus-pedidos' pela rota desejada
    } catch (error) {
      console.error('Erro ao realizar pedido:', error.response ? error.response.data : error.message);
      alert('Erro ao realizar pedido.');
    }
  };  
  
    // Atualiza o valor da compra com base na quantidade de parcelas e no tipo de pagamento
useEffect(() => {
  if (pedido.quantidade && produto) {
    const precoComDesconto = calcularPrecoComDesconto(produto.preco_padrao, produto.desconto);
    const precoTotal = pedido.quantidade * parseFloat(precoComDesconto);

    if (pedido.tipo_pgto === 'Cartão de Crédito') {
      // Se o pagamento for com Cartão de Crédito
      if (pedido.qntd_parcelas && [1, 3, 6, 12].includes(Number(pedido.qntd_parcelas))) {
        const { valorParcela, valorTotal } = calcularParcelas(precoTotal, Number(pedido.qntd_parcelas));
        setPedido((prevState) => ({
          ...prevState,
          valor_compra: valorTotal, // Atualiza o valor total
          valor_parcela: valorParcela, // Atualiza o valor da parcela
        }));
      } else {
        // Se o número de parcelas for inválido, define como 1x
        setPedido((prevState) => ({
          ...prevState,
          qntd_parcelas: 1, // Define como 1 parcela
          valor_compra: precoTotal.toFixed(2), // Atualiza o valor total
          valor_parcela: precoTotal.toFixed(2), // Atualiza o valor da parcela como o total
        }));
      }
    } else {
      // Para Boleto e Pix, sempre define 1 parcela
      setPedido((prevState) => ({
        ...prevState,
        qntd_parcelas: 1, // Apenas uma parcela permitida
        valor_compra: precoTotal.toFixed(2), // Atualiza o valor total
        valor_parcela: precoTotal.toFixed(2), // Atualiza o valor da parcela como o total
      }));
    }
  }
}, [pedido.quantidade, pedido.qntd_parcelas, pedido.tipo_pgto, produto]);
  
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
                const precoComDesconto = calcularPrecoComDesconto(produto.preco_padrao, produto.desconto);
                const novoValorCompra = quantidade * parseFloat(precoComDesconto);
                setPedido((prevState) => ({
                  ...prevState,
                  quantidade: quantidade || '', // Define como vazio se nenhum valor for selecionado
                  valor_compra: quantidade ? novoValorCompra.toFixed(2) : '',
                }));
              }}
              required
            >
              <option value={pedido.qntd_parcelas} disabled>
                Selecione a quantidade
              </option>
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
                disabled={pedido.tipo_pgto !== 'Cartão de Crédito'} // Desabilita se não for crédito
                required
              >
                <option value="">Selecione</option>
                {pedido.tipo_pgto === 'Cartão de Crédito'
                  ? [1, 3, 6, 12].map((parcela) => (
                      <option key={parcela} value={parcela}>
                        {parcela}x
                      </option>
                    ))
                  : [1].map((parcela) => (
                      <option key={parcela} value={parcela}>
                        {parcela}x
                      </option>
                    ))}
              </select>
            </div>

            <div className="payment-summary">
              <p>Valor total: R${pedido.valor_compra}</p>
              {pedido.tipo_pgto === 'Cartão de Crédito' && (
                <p>Valor da parcela: R${pedido.valor_parcela}</p>
              )}
            </div>

            <button type="submit" className="submit-btn">Enviar ao carrinho</button>
          </form>

        </div>
      ) : (
        <p>Produto não encontrado.</p>
      )}
    </div>
  );
}
