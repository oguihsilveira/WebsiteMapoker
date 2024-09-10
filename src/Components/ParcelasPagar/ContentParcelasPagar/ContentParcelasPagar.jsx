import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentParcelasPagar.css';

export default function ContentParcelasPagar() {
  const [parcelasPagar, setParcelasPagar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    data_parcela: '',
    valor_parcela: '',
    cod_conta_pagar: '',
  });
  const [editingParcelaPagar, setEditingParcelaPagar] = useState(null);

  useEffect(() => {
    fetchParcelasPagar();
  }, []);

  const fetchParcelasPagar = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/parcelas_pagar');
      setParcelasPagar(response.data);
    } catch (error) {
      console.error('Erro ao buscar parcelas a pagar:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    setFormData({
      codigo: '',
      data_parcela: '',
      valor_parcela: '',
      cod_conta_pagar: '',
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
    setEditingParcelaPagar(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingParcelaPagar) {
        await axios.put(`http://localhost:3000/parcelas_pagar/${editingParcelaPagar}`, formData);
        alert('Parcela de pagamento atualizada com sucesso!');
      } else {
        await axios.post('http://localhost:3000/parcelas_pagar', formData);
        alert('Parcela de pagamento cadastrada com sucesso!');
      }
      fetchParcelasPagar();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar parcela de pagamento:', error);
      alert('Erro ao cadastrar/atualizar parcela de pagamento.');
    }
  };

  const handleDelete = async (codigo) => {
    if (window.confirm("Tem certeza que deseja excluir esta parcela de pagamento?")) {
      try {
        await axios.delete(`http://localhost:3000/parcelas_pagar/${codigo}`);
        fetchParcelasPagar();
      } catch (error) {
        console.error('Erro ao deletar parcela de pagamento:', error);
        alert('Erro ao deletar parcela de pagamento.');
      }
    }
  };

  const handleEdit = (parcela) => {
    setEditingParcelaPagar(parcela.codigo);
    setFormData(parcela);
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
      <h2 className="title">Parcelas a Pagar</h2>
      <button className="button" onClick={handleOpenModal}>
        Nova Parcela a Pagar
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Data Parcela</th>
            <th>Valor Parcela</th>
            <th>Código Conta Pagar</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {parcelasPagar.map((parcela) => (
            <tr key={parcela.codigo}>
              <td>{parcela.codigo}</td>
              <td>{parcela.data_parcela}</td>
              <td>{parcela.valor_parcela}</td>
              <td>{parcela.cod_conta_pagar}</td>
              <td>
                <button className="button" onClick={() => handleEdit(parcela)}>
                  Editar
                </button>
                <button className="button" onClick={() => handleDelete(parcela.codigo)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para adicionar/editar parcelas a pagar */}
      <div className="modal-container" style={{ display: modalVisible ? 'block' : 'none' }}>
        <div className="modal">
          <h2 className="modal-title">
            {editingParcelaPagar ? 'Editar Parcela a Pagar' : 'Nova Parcela a Pagar'}
          </h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="date"
              placeholder="Data Parcela"
              name="data_parcela"
              value={formData.data_parcela}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              placeholder="Valor Parcela"
              name="valor_parcela"
              value={formData.valor_parcela}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              placeholder="Código Conta Pagar"
              name="cod_conta_pagar"
              value={formData.cod_conta_pagar}
              onChange={handleChange}
              className="input"
            />
            <button type="submit" className="button">
              {editingParcelaPagar ? 'Atualizar' : 'Cadastrar'}
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