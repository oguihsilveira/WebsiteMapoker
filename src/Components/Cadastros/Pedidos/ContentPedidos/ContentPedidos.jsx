import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentPedidos.css';

export default function ContentPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalPedido, setModalPedido] = useState(null); // Armazena os dados do pedido para a modal

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = () => {
    axios.get('http://localhost:3000/pedidos')
      .then(response => {
        if (Array.isArray(response.data.pedidos)) {
          setPedidos(response.data.pedidos);
        } else {
          console.error('Formato inesperado da resposta da API:', response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar pedidos:', error);
        setLoading(false);
      });
  };

  const handleDelete = (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      axios.delete('http://localhost:3000/pedidos', { params: { codigo } })
        .then(() => {
          fetchPedidos();
          alert('Pedido excluído com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao deletar pedido:', error.response ? error.response.data : error.message);
          alert('Erro ao deletar pedido.');
        });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const openModal = (pedido) => {
    setModalPedido(pedido);
  };

  const closeModal = () => {
    setModalPedido(null);
  };

  // Mapeamento dos rótulos de campos
  const fieldLabels = {
    item: 'Item',
    quantidade: 'Quantidade',
    destinatario: 'Destinatário',
    endereco: 'Endereço',
    tipo_pgto: 'Tipo de Pagamento',
    qntd_parcelas: 'Quantidade de Parcelas',
    data_compra: 'Data da Compra',
    valor_compra: 'Valor da Compra',
    valor_parcela: 'Valor da Parcela',
    status: 'Status',
    cod_produto: 'Código do Produto',
    cod_cliente: 'Código do Cliente',
  };

  // Campos a exibir na tabela (excluindo 'codigo')
  const tableFields = Object.keys(fieldLabels);

  const filteredPedidos = Array.isArray(pedidos) ? pedidos.filter(pedido =>
    pedido.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pedido.destinatario.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pedido.codigo.toString().includes(searchQuery)
  ).reverse() : [];

  if (loading) {
    return (
      <div className="loading-container">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="content-container">
      <h2 className="title">Pedidos</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Pesquisar por item, destinatário ou código..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            {Object.values(fieldLabels).map(label => (
              <th key={label}>{label}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredPedidos.map((pedido) => (
            <tr key={pedido.codigo}>
              {tableFields.map((field) => (
                <td key={field}>
                  {field === 'data_compra' ? formatDate(pedido[field]) : pedido[field]}
                </td>
              ))}
              <td className="actions">
                <button
                  className="button view-button"
                  onClick={() => openModal(pedido)}
                >
                  Visualizar
                </button>
                <button
                  className="button delete-button"
                  onClick={() => handleDelete(pedido.codigo)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalPedido && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Detalhes do Pedido</h3>
            <table className="modal-table">
              <tbody>
                {Object.keys({ codigo: 'Código', ...fieldLabels }).map(field => (
                  <tr key={field}>
                    <td className="modal-label">{field === 'codigo' ? 'Código' : fieldLabels[field]}</td>
                    <td className="modal-value">{field === 'data_compra' ? formatDate(modalPedido[field]) : modalPedido[field]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="modal-close" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}