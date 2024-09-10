import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentContasPagamentos.css';

export default function ContentContasPagamentos() {
  const [contasPagamentos, setContasPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    data_emissao: '',
    data_final_pagto: '',
    valor_total: '',
    tipo_pagto: '',
    taxa_icms: '',
    cod_compra: '',
  });
  const [editingContaPagamento, setEditingContaPagamento] = useState(null);

  useEffect(() => {
    fetchContasPagamentos();
  }, []);

  const fetchContasPagamentos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/contas_pagamentos');
      setContasPagamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar contas a pagar:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    setFormData({
      codigo: '',
      data_emissao: '',
      data_final_pagto: '',
      valor_total: '',
      tipo_pagto: '',
      taxa_icms: '',
      cod_compra: '',
    });

    setTimeout(() => {
      const modal = document.querySelector('.modal');
      if (modal) {
        modal.scrollTop = 0;
      }
    }, 0);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingContaPagamento(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContaPagamento) {
        await axios.put(`http://localhost:3000/contas_pagamentos/${editingContaPagamento}`, formData);
        alert('Conta de pagamento atualizada com sucesso!');
      } else {
        await axios.post('http://localhost:3000/contas_pagamentos', formData);
        alert('Conta de pagamento cadastrada com sucesso!');
      }
      fetchContasPagamentos();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar conta de pagamento:', error);
      alert('Erro ao cadastrar/atualizar conta de pagamento.');
    }
  };

  const handleDelete = async (codigo) => {
    if (window.confirm("Tem certeza que deseja excluir esta conta de pagamento?")) {
      try {
        await axios.delete(`http://localhost:3000/contas_pagamentos/${codigo}`);
        fetchContasPagamentos();
      } catch (error) {
        console.error('Erro ao deletar conta de pagamento:', error);
        alert('Erro ao deletar conta de pagamento.');
      }
    }
  };

  const handleEdit = (conta) => {
    setEditingContaPagamento(conta.codigo);
    setFormData(conta);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="content-container">
      <h2 className="title">Contas a Pagar</h2>
      <button className="button" onClick={handleOpenModal}>
        Nova Conta a Pagar
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Data Emissão</th>
            <th>Data Final Pagto</th>
            <th>Valor Total</th>
            <th>Tipo Pagamento</th>
            <th>Taxa ICMS</th>
            <th>Código Compra</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contasPagamentos.map((conta) => (
            <tr key={conta.codigo}>
              <td>{conta.codigo}</td>
              <td>{conta.data_emissao}</td>
              <td>{conta.data_final_pagto}</td>
              <td>{conta.valor_total}</td>
              <td>{conta.tipo_pagto}</td>
              <td>{conta.taxa_icms}</td>
              <td>{conta.cod_compra}</td>
              <td>
                <button className="button" onClick={() => handleEdit(conta)}>
                  Editar
                </button>
                <button className="button" onClick={() => handleDelete(conta.codigo)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para adicionar/editar contas a pagar */}
      <div className="modal-container" style={{ display: modalVisible ? 'block' : 'none' }}>
        <div className="modal">
          <h2 className="modal-title">
            {editingContaPagamento ? 'Editar Conta a Pagar' : 'Nova Conta a Pagar'}
          </h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="date"
              placeholder="Data Emissão"
              name="data_emissao"
              value={formData.data_emissao}
              onChange={handleChange}
              className="input"
            />
            <input
              type="date"
              placeholder="Data Final Pagto"
              name="data_final_pagto"
              value={formData.data_final_pagto}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              placeholder="Valor Total"
              name="valor_total"
              value={formData.valor_total}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              placeholder="Tipo Pagamento"
              name="tipo_pagto"
              value={formData.tipo_pagto}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              placeholder="Taxa ICMS"
              name="taxa_icms"
              value={formData.taxa_icms}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              placeholder="Código Compra"
              name="cod_compra"
              value={formData.cod_compra}
              onChange={handleChange}
              className="input"
            />
            <button type="submit" className="button">
              {editingContaPagamento ? 'Atualizar' : 'Cadastrar'}
            </button>
            <button type="button" className="button" onClick={handleCloseModal}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}