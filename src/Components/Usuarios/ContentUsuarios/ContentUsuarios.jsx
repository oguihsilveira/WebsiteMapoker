import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentUsuarios.css';

export default function ContentUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    login: '',
    senha: '',
    cod_funcionario: '',
  });
  const [editingUsuario, setEditingUsuario] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    setFormData({
      codigo: '',
      login: '',
      senha: '',
      cod_funcionario: '',
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
    setEditingUsuario(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUsuario) {
        await axios.put(`http://localhost:3000/usuarios/${editingUsuario}`, formData);
        alert('Usuário atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:3000/usuarios', formData);
        alert('Usuário cadastrado com sucesso!');
      }
      fetchUsuarios();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar usuário:', error);
      alert('Erro ao cadastrar/atualizar usuário.');
    }
  };

  const handleDelete = async (codigo) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await axios.delete(`http://localhost:3000/usuarios/${codigo}`);
        fetchUsuarios();
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        alert('Erro ao deletar usuário.');
      }
    }
  };

  const handleEdit = (usuario) => {
    setEditingUsuario(usuario.codigo);
    setFormData(usuario);
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
      <h2 className="title">Usuários</h2>
      <button className="button" onClick={handleOpenModal}>
        Novo Usuário
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Login</th>
            <th>Senha</th>
            <th>Código Funcionário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.codigo}>
              <td>{usuario.codigo}</td>
              <td>{usuario.login}</td>
              <td>{usuario.senha}</td>
              <td>{usuario.cod_funcionario}</td>
              <td>
                <button className="button" onClick={() => handleEdit(usuario)}>
                  Editar
                </button>
                <button className="button" onClick={() => handleDelete(usuario.codigo)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para adicionar/editar usuários */}
      <div className="modal-container" style={{ display: modalVisible ? 'block' : 'none' }}>
        <div className="modal">
          <h2 className="modal-title">
            {editingUsuario ? 'Editar Usuário' : 'Novo Usuário'}
          </h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Login"
              name="login"
              value={formData.login}
              onChange={handleChange}
              className="input"
            />
            <input
              type="password"
              placeholder="Senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              placeholder="Código Funcionário"
              name="cod_funcionario"
              value={formData.cod_funcionario}
              onChange={handleChange}
              className="input"
            />
            <button type="submit" className="button">
              {editingUsuario ? 'Atualizar' : 'Cadastrar'}
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