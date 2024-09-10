import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentFuncionarios.css'; 

export default function ContentFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    email: '',
    datanasc: '',
    cargo: '',
    salario: '',
    endereco: '',
    cargaHoraria: '',
  });
  const [editingFuncionario, setEditingFuncionario] = useState(null); 

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/funcionarios');
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    setFormData({
      codigo: '',
      nome: '',
      email: '',
      datanasc: '',
      cargo: '',
      salario: '',
      endereco: '',
      cargaHoraria: '',
    });
    
    // Garante que a modal comece no topo
    setTimeout(() => {
      const modal = document.querySelector('.modal');
      if (modal) {
        modal.scrollTop = 0;
      }
    }, 0);
  };  

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingFuncionario(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFuncionario) {
        await axios.put(`http://localhost:3000/funcionarios/${editingFuncionario}`, formData);
        alert('Funcionário atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:3000/funcionarios', formData);
        alert('Funcionário cadastrado com sucesso!');
      }
      fetchFuncionarios();
      handleCloseModal(); 
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar funcionário:', error);
      alert('Erro ao cadastrar/atualizar funcionário.');
    }
  };

  const handleDelete = async (codigo) => {
    if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
      try {
        await axios.delete(`http://localhost:3000/funcionarios/${codigo}`);
        fetchFuncionarios();
      } catch (error) {
        console.error('Erro ao deletar funcionário:', error);
        alert('Erro ao deletar funcionário.');
      }
    }
  };

  const handleEdit = (funcionario) => {
    setEditingFuncionario(funcionario.codigo);
    setFormData(funcionario);
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
      <h2 className="title">Funcionários</h2>
      <button className="button" onClick={handleOpenModal}>
        Novo Funcionário
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Data de Nascimento</th>
            <th>Cargo</th>
            <th>Salário</th>
            <th>Endereço</th>
            <th>Carga Horária</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.codigo}>
              <td>{funcionario.codigo}</td>
              <td>{funcionario.nome}</td>
              <td>{funcionario.email}</td>
              <td>{funcionario.datanasc}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.salario}</td>
              <td>{funcionario.endereco}</td>
              <td>{funcionario.cargaHoraria}</td>
              <td>
                <button className="button" onClick={() => handleEdit(funcionario)}>
                  Editar
                </button>
                <button className="button" onClick={() => handleDelete(funcionario.codigo)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para adicionar/editar funcionários */}
      <div className="modal-container" style={{ display: modalVisible ? 'block' : 'none' }}>
        <div className="modal">
          <h2 className="modal-title">
            {editingFuncionario ? 'Editar Funcionário' : 'Novo Funcionário'}
          </h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Nome"
              name="nome"
              value={formData.nome}
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
            <input
              type="date"
              placeholder="Data de Nascimento"
              name="datanasc"
              value={formData.datanasc}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              placeholder="Cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              placeholder="Salário"
              name="salario"
              value={formData.salario}
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
              placeholder="Carga Horária"
              name="cargaHoraria"
              value={formData.cargaHoraria}
              onChange={handleChange}
              className="input"
            />
            <button type="submit" className="button">
              {editingFuncionario ? 'Atualizar' : 'Cadastrar'}
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