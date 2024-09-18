import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones para mostrar/ocultar senha
import './ContentUsuarios.css';

export default function ContentUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    codigo: '',
    login: '',
    senha: '',
    cod_funcionario: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para visibilidade da senha

  useEffect(() => {
    fetchUsuarios();
    fetchFuncionarios(); // Carregar funcionários para preencher o select
  }, []);

  const fetchUsuarios = () => {
    axios.get('http://localhost:3000/usuarios')
      .then(response => {
        if (Array.isArray(response.data.usuarios)) {
          setUsuarios(response.data.usuarios);
        } else {
          console.error('Formato inesperado da resposta da API:', response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar usuários:', error);
        setLoading(false);
      });
  };

  const fetchFuncionarios = () => {
    axios.get('http://localhost:3000/funcionarios')
      .then(response => {
        if (Array.isArray(response.data.funcionarios)) {
          setFuncionarios(response.data.funcionarios);
        } else {
          console.error('Formato inesperado da resposta da API:', response.data);
        }
      })
      .catch(error => {
        console.error('Erro ao carregar funcionários:', error);
      });
  };

  const handleOpenModal = (type, usuario = null) => {
    if (type === 'edit' && usuario) {
      setFormData(usuario);
    } else {
      setFormData({
        codigo: '',
        login: '',
        senha: '',
        cod_funcionario: '',
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
    postUsuario(formData);
  };

  const postUsuario = (data) => {
    axios.post('http://localhost:3000/usuarios', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        fetchUsuarios(); // Atualiza a lista de usuários
        handleCloseModal();
        alert('Usuário cadastrado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao cadastrar usuário:', error.response ? error.response.data : error.message);
        alert('Erro ao cadastrar usuário.');
      });
  };

  const handleUpdate = () => {
    putUsuario(formData);
  };

  const putUsuario = (data) => {
    axios.put('http://localhost:3000/usuarios', data, {
      params: { codigo: data.codigo }
    })
    .then(response => {
      fetchUsuarios(); // Atualiza a lista de usuários
      handleCloseModal();
      alert('Usuário atualizado com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao atualizar usuário:', error.response ? error.response.data : error.message);
      alert('Erro ao atualizar usuário.');
    });
  };

  const handleDelete = (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      axios.delete('http://localhost:3000/usuarios', { params: { codigo } })
        .then(response => {
          fetchUsuarios(); // Atualiza a lista de usuários
          alert('Usuário excluído com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao deletar usuário:', error.response ? error.response.data : error.message);
          alert('Erro ao deletar usuário.');
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

  const filteredUsuarios = Array.isArray(usuarios) ? usuarios.filter(usuario =>
    usuario.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
    usuario.cod_funcionario.toString().includes(searchQuery.toLowerCase())
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
      <h2 className="title">Usuários</h2>

      <div className="controls">
        <button className="button add-button" onClick={() => handleOpenModal('add')}>
          Adicionar Novo Usuário
        </button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Pesquisar por login ou código do funcionário..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Login</th>
            <th>Senha</th>
            <th>Código do Funcionário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map((usuario) => (
            <tr key={usuario.codigo}>
              <td>{usuario.codigo}</td>
              <td>{usuario.login}</td>
              <td>
                {/* Exibe um ícone para mostrar/ocultar a senha */}
                <span className="password-container">
                  {showPassword ? usuario.senha : '********'}
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </span>
              </td>
              <td>{usuario.cod_funcionario}</td>
              <td className="actions">
                <button className="button" onClick={() => handleOpenModal('edit', usuario)}>
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

      {modalVisible && (
        <div className="modal-container">
          <div className="modal">
            <h2 className="modal-title">
              {modalType === 'edit' ? 'Editar Usuário' : 'Novo Usuário'}
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
                placeholder="Login"
                name="login"
                value={formData.login}
                onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                className="input"
              />
              <input
                type={showPassword ? 'text' : 'password'} // Mostrar ou ocultar senha no formulário
                placeholder="Senha"
                name="senha"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                className="input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <select
                name="cod_funcionario"
                value={formData.cod_funcionario}
                onChange={(e) => setFormData({ ...formData, cod_funcionario: e.target.value })}
                className="input"
              >
                <option value="">Selecione um Funcionário</option>
                {funcionarios.map((funcionario) => (
                  <option key={funcionario.codigo} value={funcionario.codigo}>
                    {funcionario.nome}
                  </option>
                ))}
              </select>
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
