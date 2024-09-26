import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentFuncionarios.css';

export default function ContentFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    email: '',
    datanasc: '', // Campo para Data de Nascimento
    cargo: '',
    salario: '',
    endereco: '',
    carga_horaria: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = () => {
    axios.get('http://localhost:3000/funcionarios')
      .then(response => {
        if (Array.isArray(response.data.funcionarios)) {
          setFuncionarios(response.data.funcionarios);
        } else {
          console.error('Formato inesperado da resposta da API:', response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar funcionários:', error);
        setLoading(false);
      });
  };

  const handleOpenModal = (type, funcionario = null) => {
    if (type === 'edit' && funcionario) {
      // Converte a data de nascimento para o formato 'YYYY-MM-DD' se ela existir
      const formattedDate = funcionario.datanasc 
        ? new Date(funcionario.datanasc).toISOString().split('T')[0] 
        : '';
  
      setFormData({
        ...funcionario,
        datanasc: formattedDate, // Preenche o campo de data com a data formatada
      });
    } else {
      setFormData({
        codigo: '',
        nome: '',
        email: '',
        datanasc: '', // Limpa o campo para novo funcionário
        cargo: '',
        salario: '',
        endereco: '',
        carga_horaria: '',
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
    postFuncionario(formData);
  };

  const postFuncionario = (data) => {
    axios.post('http://localhost:3000/funcionarios', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        fetchFuncionarios(); // Atualiza a lista de funcionários
        handleCloseModal();
        alert('Funcionário cadastrado com sucesso!');
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          alert('Erro: O código do funcionário já existe. Por favor, escolha um código diferente.');
        } else {
          console.error('Erro ao cadastrar funcionário:', error.response ? error.response.data : error.message);
          alert('Erro ao cadastrar funcionário.');
        }
      });
  };

  const handleUpdate = () => {
    putFuncionario(formData);
  };

  const putFuncionario = (data) => {
    axios.put('http://localhost:3000/funcionarios', data, {
      params: { codigo: data.codigo }
    })
    .then(response => {
      fetchFuncionarios(); // Atualiza a lista de funcionários
      handleCloseModal();
      alert('Funcionário atualizado com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao atualizar funcionário:', error.response ? error.response.data : error.message);
      alert('Erro ao atualizar funcionário.');
    });
  };

  const handleDelete = (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
        axios.delete('http://localhost:3000/funcionarios', { params: { codigo } })
            .then(response => {
                fetchFuncionarios(); // Atualiza a lista de funcionários
                alert('Funcionário excluído com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao deletar funcionário:', error.response ? error.response.data : error.message);
                alert(error.response && error.response.data.error ? error.response.data.error : 'Erro ao deletar funcionário.');
            });
    }
  };

  const fieldLabels = {
    codigo: 'Código',
    nome: 'Nome',
    email: 'Email',
    datanasc: 'Data de Nascimento',
    cargo: 'Cargo',
    salario: 'Salário',
    endereco: 'Endereço',
    carga_horaria: 'Carga Horária',
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validação de campos obrigatórios
    const requiredFields = Object.keys(fieldLabels);
    const emptyFields = requiredFields.filter(field => !formData[field]);
  
    if (emptyFields.length > 0) {
      const missingFieldLabels = emptyFields.map(field => fieldLabels[field]);
      alert(`Por favor, preencha os seguintes campos: ${missingFieldLabels.join(', ')}`);
      return;
    }
  
    if (modalType === 'add') {
      handleInsert();
    } else if (modalType === 'edit') {
      handleUpdate();
    }
  };
  
    

  const filteredFuncionarios = Array.isArray(funcionarios) ? funcionarios.filter(funcionario =>
    funcionario.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    funcionario.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    funcionario.codigo.toString().toLowerCase().includes(searchQuery.toLowerCase()) // Adicionando a busca por código
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
      <h2 className="title">Funcionários</h2>

      <div className="controls">
        <button className="button add-button" onClick={() => handleOpenModal('add')}>
          Adicionar Novo Funcionário
        </button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Pesquisar por nome, email ou código..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

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
                <button className="button" onClick={() => handleOpenModal('edit', funcionario)}>
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
            <h2 className="modal-title">
              {modalType === 'edit' ? 'Editar Funcionário' : 'Novo Funcionário'}
            </h2>
            <form onSubmit={handleSubmit} className="form">
              <label>
                Código:
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                  className="input"
                  disabled={modalType === 'edit'} // Disable input for code in edit mode
                />
              </label>
              <label>
                Nome:
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="input"
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                />
              </label>
              <label>
                Data de Nascimento:
                <input
                  type="date"
                  name="datanasc"
                  value={formData.datanasc}
                  onChange={(e) => setFormData({ ...formData, datanasc: e.target.value })}
                  className="input"
                />
              </label>
              <label>
                Cargo:
                <input
                  type="text"
                  name="cargo"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  className="input"
                />
              </label>
              <label>
                Salário:
                <input
                  type="number"
                  name="salario"
                  value={formData.salario}
                  onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
                  onWheel={(e) => e.target.blur()}
                  className="input"
                />
              </label>
              <label>
                Endereço:
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  className="input"
                />
              </label>
              <label>
                Carga Horária:
                <input
                  type="text"
                  name="carga_horaria"
                  value={formData.carga_horaria}
                  onChange={(e) => setFormData({ ...formData, carga_horaria: e.target.value })}
                  className="input"
                />
              </label>
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