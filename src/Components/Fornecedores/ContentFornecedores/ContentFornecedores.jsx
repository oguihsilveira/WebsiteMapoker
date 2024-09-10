import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentFornecedores.css';

export default function ContentFornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    empresa: '',
    endereco: '',
    cnpj: '',
    telefone: '',
    email: '',
  });
  const [editingFornecedor, setEditingFornecedor] = useState(null);

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const fetchFornecedores = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/fornecedores');
      setFornecedores(response.data);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    setFormData({
      codigo: '',
      empresa: '',
      endereco: '',
      cnpj: '',
      telefone: '',
      email: '',
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
    setEditingFornecedor(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFornecedor) {
        await axios.put(`http://localhost:3000/fornecedores/${editingFornecedor}`, formData);
        alert('Fornecedor atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:3000/fornecedores', formData);
        alert('Fornecedor cadastrado com sucesso!');
      }
      fetchFornecedores();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar fornecedor:', error);
      alert('Erro ao cadastrar/atualizar fornecedor.');
    }
  };

  const handleDelete = async (codigo) => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      try {
        await axios.delete(`http://localhost:3000/fornecedores/${codigo}`);
        fetchFornecedores();
      } catch (error) {
        console.error('Erro ao deletar fornecedor:', error);
        alert('Erro ao deletar fornecedor.');
      }
    }
  };

  const handleEdit = (fornecedor) => {
    setEditingFornecedor(fornecedor.codigo);
    setFormData(fornecedor);
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
      <h2 className="title">Fornecedores</h2>
      <button className="button" onClick={handleOpenModal}>
        Novo Fornecedor
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Empresa</th>
            <th>Endereço</th>
            <th>CNPJ</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.codigo}>
              <td>{fornecedor.codigo}</td>
              <td>{fornecedor.empresa}</td>
              <td>{fornecedor.endereco}</td>
              <td>{fornecedor.cnpj}</td>
              <td>{fornecedor.telefone}</td>
              <td>{fornecedor.email}</td>
              <td>
                <button className="button" onClick={() => handleEdit(fornecedor)}>
                  Editar
                </button>
                <button className="button" onClick={() => handleDelete(fornecedor.codigo)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para adicionar/editar fornecedores */}
      <div className="modal-container" style={{ display: modalVisible ? 'block' : 'none' }}>
        <div className="modal">
          <h2 className="modal-title">
            {editingFornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}
          </h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              placeholder="Endereço"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              placeholder="CNPJ"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              placeholder="Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
            <button type="submit" className="button">
              {editingFornecedor ? 'Atualizar' : 'Cadastrar'}
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