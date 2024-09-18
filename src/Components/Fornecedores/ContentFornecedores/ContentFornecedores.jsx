import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentFornecedores.css';

export default function ContentFornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    codigo: '',
    empresa: '',
    endereco: '',
    cnpj: '',
    telefone: '',
    email: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const fetchFornecedores = () => {
    axios.get('http://localhost:3000/fornecedores')
      .then(response => {
        if (Array.isArray(response.data.fornecedores)) {
          setFornecedores(response.data.fornecedores);
        } else {
          console.error('Formato inesperado da resposta da API:', response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar fornecedores:', error);
        setLoading(false);
      });
  };

  const handleOpenModal = (type, fornecedor = null) => {
    if (type === 'edit' && fornecedor) {
      setFormData(fornecedor);
    } else {
      setFormData({
        codigo: '',
        empresa: '',
        endereco: '',
        cnpj: '',
        telefone: '',
        email: '',
      });
    }
    setModalType(type);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalType(null);
  };

  const handleInsert = () => {
    postFornecedor(formData);
  };

  const postFornecedor = (data) => {
    axios.post('http://localhost:3000/fornecedores', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        fetchFornecedores(); // Atualiza a lista de fornecedores
        handleCloseModal();
        alert('Fornecedor cadastrado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao cadastrar fornecedor:', error.response ? error.response.data : error.message);
        alert('Erro ao cadastrar fornecedor.');
      });
  };

  const handleUpdate = () => {
    putFornecedor(formData);
  };

  const putFornecedor = (data) => {
    axios.put('http://localhost:3000/fornecedores', data, {
      params: { codigo: data.codigo }
    })
    .then(response => {
      fetchFornecedores(); // Atualiza a lista de fornecedores
      handleCloseModal();
      alert('Fornecedor atualizado com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao atualizar fornecedor:', error.response ? error.response.data : error.message);
      alert('Erro ao atualizar fornecedor.');
    });
  };

  const handleDelete = (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
      axios.delete('http://localhost:3000/fornecedores', { params: { codigo } })
        .then(response => {
          fetchFornecedores(); // Atualiza a lista de fornecedores
          alert('Fornecedor excluído com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao deletar fornecedor:', error.response ? error.response.data : error.message);
          alert('Erro ao deletar fornecedor.');
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      handleInsert();
    } else if (modalType === 'edit') {
      handleUpdate();
    }
  };

  const filteredFornecedores = Array.isArray(fornecedores) ? fornecedores.filter(fornecedor =>
    fornecedor.empresa.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fornecedor.email.toLowerCase().includes(searchQuery.toLowerCase())
  ).reverse() : []; // Adiciona .reverse() para inverter a ordem

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

      <div className="controls">
        <button className="button add-button" onClick={() => handleOpenModal('add')}>
          Adicionar Novo Fornecedor
        </button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Pesquisar por empresa ou email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

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
          {filteredFornecedores.map((fornecedor) => (
            <tr key={fornecedor.codigo}>
              <td>{fornecedor.codigo}</td>
              <td>{fornecedor.empresa}</td>
              <td>{fornecedor.endereco}</td>
              <td>{fornecedor.cnpj}</td>
              <td>{fornecedor.telefone}</td>
              <td>{fornecedor.email}</td>
              <td className="actions">
                <button className="button" onClick={() => handleOpenModal('edit', fornecedor)}>
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

      {modalVisible && (
        <div className="modal-container">
          <div className="modal">
            <h2 className="modal-title">
              {modalType === 'edit' ? 'Editar Fornecedor' : 'Novo Fornecedor'}
            </h2>
            <form onSubmit={handleSubmit} className="form">
              <input
                type="text"
                placeholder="Código"
                name="codigo"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                className="input"
                disabled={modalType === 'edit'} // Disable input for code in edit mode
              />
              <input
                type="text"
                placeholder="Empresa"
                name="empresa"
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                className="input"
              />
              <input
                type="text"
                placeholder="Endereço"
                name="endereco"
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                className="input"
              />
              <input
                type="text"
                placeholder="CNPJ"
                name="cnpj"
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                className="input"
              />
              <input
                type="text"
                placeholder="Telefone"
                name="telefone"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="input"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input"
              />
              <div className="form-buttons">
                <button type="submit" className="button">
                  {modalType === 'edit' ? 'Atualizar' : 'Cadastrar'}
                </button>
                <button type="button" className="button" onClick={handleCloseModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}