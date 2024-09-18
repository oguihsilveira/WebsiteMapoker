import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentFuncionarios.css';

export default function ContentFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingFuncionario, setEditingFuncionario] = useState(null);
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    email: '',
    datanasc: '',
    cargo: '',
    salario: '',
    endereco: '',
    carga_horaria: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/funcionarios')
      .then(response => {
        setFuncionarios(response.data.funcionarios);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar funcionários:', error);
        setLoading(false);
      });
  }, []);

  const handleOpenModal = (funcionario = null) => {
    if (funcionario) {
      setFormData(funcionario);
      setEditingFuncionario(funcionario.codigo);
    } else {
      setFormData({
        codigo: '',
        nome: '',
        email: '',
        datanasc: '',
        cargo: '',
        salario: '',
        endereco: '',
        carga_horaria: '',
      });
      setEditingFuncionario(null);
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingFuncionario(null);
  };

  const handleUpdate = () => {
    if (Object.values(formData).some(field => field === '')) {
      alert('Todos os campos devem ser preenchidos.');
      return;
    }

    axios.get('http://localhost:3000/funcionarios')
      .then(response => {
        const funcionariosList = response.data.funcionarios;
        const codigoDuplicado = funcionariosList.some(funcionario => funcionario.codigo === formData.codigo && funcionario.codigo !== editingFuncionario);

        if (codigoDuplicado) {
          alert('Já existe um funcionário com este código.');
          return;
        }

        axios.put('http://localhost:3000/funcionarios', formData, {
          params: { codigo: formData.codigo }
        })
        .then(response => {
          setFuncionarios(funcionarios.map(funcionario =>
            funcionario.codigo === formData.codigo ? formData : funcionario
          ));
          setEditingFuncionario(null);
          setFormData({
            codigo: '',
            nome: '',
            email: '',
            datanasc: '',
            cargo: '',
            salario: '',
            endereco: '',
            carga_horaria: ''
          });
          setModalVisible(false);
          alert('Funcionário atualizado com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao atualizar funcionário:', error.response ? error.response.data : error.message);
          alert('Erro ao atualizar funcionário.');
        });
      })
      .catch(error => {
        console.error('Erro ao verificar código:', error);
      });
  };

  const handleDelete = (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      axios.delete('http://localhost:3000/funcionarios', { params: { codigo } })
        .then(response => {
          setFuncionarios(funcionarios.filter(funcionario => funcionario.codigo !== codigo));
          alert('Funcionário excluído com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao deletar funcionário:', error.response ? error.response.data : error.message);
          alert('Erro ao deletar funcionário.');
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingFuncionario) {
      handleUpdate();
    } else {
      if (Object.values(formData).some(field => field === '')) {
        alert('Todos os campos devem ser preenchidos.');
        return;
      }

      axios.post('http://localhost:3000/funcionarios', formData)
        .then(response => {
          setFuncionarios([...funcionarios, response.data.funcionario]);
          setFormData({
            codigo: '',
            nome: '',
            email: '',
            datanasc: '',
            cargo: '',
            salario: '',
            endereco: '',
            carga_horaria: '',
          });
          setModalVisible(false);
          alert('Funcionário cadastrado com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao cadastrar funcionário:', error.response ? error.response.data : error.message);
          alert('Erro ao cadastrar funcionário.');
        });
    }
  };

  const filteredFuncionarios = funcionarios.filter(funcionario =>
    funcionario.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    funcionario.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Botão para abrir a modal */}
      <div className="controls">
        <button className="button add-button" onClick={() => handleOpenModal()}>
          Adicionar Novo Funcionário
        </button>
      </div>

      {/* Barra de Pesquisa */}
      <div className="controls">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Tabela de Funcionários */}
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
          {filteredFuncionarios.map((funcionario) => (
            <tr key={funcionario.codigo}>
              <td>{funcionario.codigo}</td>
              <td>{funcionario.nome}</td>
              <td>{funcionario.email}</td>
              <td>{new Date(funcionario.datanasc).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.salario}</td>
              <td>{funcionario.endereco}</td>
              <td>{funcionario.carga_horaria}</td>
              <td className="actions">
                <button className="button" onClick={() => handleOpenModal(funcionario)}>
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

      {modalVisible && (
        <div className="modal-container">
          <div className="modal">
            <h2 className="modal-title">{editingFuncionario ? 'Editar Funcionário' : 'Novo Funcionário'}</h2>
            <form onSubmit={handleSubmit} className="form">
              <input
                type="text"
                placeholder="Código"
                name="codigo"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                className="input"
                disabled={editingFuncionario ? true : false} // Evita editar código ao atualizar
              />
              <input
                type="text"
                placeholder="Nome"
                name="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
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
              <input
                type="date"
                placeholder="Data de Nascimento"
                name="datanasc"
                value={formData.datanasc}
                onChange={(e) => setFormData({ ...formData, datanasc: e.target.value })}
                className="input"
              />
              <input
                type="text"
                placeholder="Cargo"
                name="cargo"
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                className="input"
              />
              <input
                type="number"
                placeholder="Salário"
                name="salario"
                value={formData.salario}
                onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
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
                placeholder="Carga Horária"
                name="carga_horaria"
                value={formData.carga_horaria}
                onChange={(e) => setFormData({ ...formData, carga_horaria: e.target.value })}
                className="input"
              />
              <div className="form-buttons">
                <button type="submit" className="button">
                  {editingFuncionario ? 'Atualizar' : 'Cadastrar'}
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