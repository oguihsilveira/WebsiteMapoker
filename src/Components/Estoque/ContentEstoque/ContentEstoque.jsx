import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentEstoque.css';

export default function ContentEstoque() {
  const [estoque, setEstoque] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    codigo: '',
    item: '',
    tipo: '',
    preco_compra: '',
    preco_venda: '',
    data_entrada: '',
    qtde_entrada: '',
    cod_funcionario: '', // Agora um select para funcionário
    observacoes: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEstoque();
    fetchFuncionarios();
  }, []);

  const fetchEstoque = () => {
    axios.get('http://localhost:3000/estoque')
      .then(response => {
        if (Array.isArray(response.data.estoque)) {
          setEstoque(response.data.estoque);
        } else {
          console.error('Formato inesperado da resposta da API:', response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar estoque:', error);
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

  const handleOpenModal = (type, item = null) => {
    if (type === 'edit' && item) {
      // Converte a data de entrada para o formato 'YYYY-MM-DD' se ela existir
      const formattedDate = item.data_entrada 
        ? new Date(item.data_entrada).toISOString().split('T')[0] 
        : '';
  
      setFormData({
        ...item,
        data_entrada: formattedDate, // Preenche o campo de data com a data formatada
      });
    } else {
      setFormData({
        codigo: '',
        item: '',
        tipo: '',
        preco_compra: '',
        preco_venda: '',
        data_entrada: '', // Limpa o campo para novo item
        qtde_entrada: '',
        cod_funcionario: '',
        observacoes: '',
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
    postEstoque(formData);
  };

  const postEstoque = (data) => {
    axios.post('http://localhost:3000/estoque', data)
      .then(() => {
        fetchEstoque();
        handleCloseModal();
        alert('Item no estoque cadastrado com sucesso!');
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          alert('Erro: O código do item já existe. Por favor, escolha um código diferente.');
        } else {
          console.error('Erro ao cadastrar item no estoque:', error.response ? error.response.data : error.message);
          alert('Erro ao cadastrar item no estoque.');
        }
      });
  };

  const handleUpdate = () => {
    putEstoque(formData);
  };

  const putEstoque = (data) => {
    axios.put('http://localhost:3000/estoque', data, { params: { codigo: data.codigo } })
      .then(() => {
        fetchEstoque();
        handleCloseModal();
        alert('Item no estoque atualizado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao atualizar item no estoque:', error.response ? error.response.data : error.message);
        alert('Erro ao atualizar item no estoque.');
      });
  };

  const handleDelete = (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este item no estoque?')) {
      axios.delete('http://localhost:3000/estoque', { params: { codigo } })
        .then(() => {
          fetchEstoque();
          alert('Item no estoque excluído com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao deletar item no estoque:', error.response ? error.response.data : error.message);
          alert(error.response && error.response.data.error ? error.response.data.error : 'Erro ao deletar item no estoque.');
        });
    }
  };

  const fieldLabels = {
    codigo: 'Código',
    produto: 'Produto',
    quantidade: 'Quantidade',
    preco: 'Preço',
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

  const filteredEstoque = estoque.filter(item =>
    item.tipo.toLowerCase().includes(searchQuery.toLowerCase()) || // Pesquisa pelo tipo
    item.codigo.toString().toLowerCase().includes(searchQuery.toLowerCase()) // Pesquisa pelo código
  ).reverse();

  if (loading) {
    return (
      <div className="loading-container">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="content-container">
      <h2 className="title">Estoque</h2>

      <div className="controls">
        <button className="button add-button" onClick={() => handleOpenModal('add')}>
          Adicionar Novo Item
        </button>
      </div>
      <div className="controls">
        <input
          type="text"
          placeholder="Pesquisar por tipo ou código do estoque..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Item</th>
            <th>Tipo</th>
            <th>Preço de Compra/Unidade(R$)</th>
            <th>Preço de Venda/Unidade(R$)</th>
            <th>Data de Entrada</th>
            <th>Quantidade de Entrada</th>
            <th>Código do Funcionário</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredEstoque.map((item) => (
            <tr key={item.codigo}>
              <td>{item.codigo}</td>
              <td>{item.item}</td>
              <td>{item.tipo}</td>
              <td>R${item.preco_compra.toFixed(2)}</td>
              <td>R${item.preco_venda.toFixed(2)}</td>
              <td>{new Date(item.data_entrada).toLocaleDateString('pt-BR')}</td>
              <td>{item.qtde_entrada}</td>
              <td>{item.cod_funcionario}</td>
              <td>{item.observacoes}</td>
              <td className="actions">
                <button className="button" onClick={() => handleOpenModal('edit', item)}>Editar</button>
                <button className="button" onClick={() => handleDelete(item.codigo)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="modal-container">
          <div className="modal">
            <h2 className="modal-title">{modalType === 'edit' ? 'Editar Item no Estoque' : 'Novo Item no Estoque'}</h2>
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
                Item:
                <input
                  type="text"
                  name="item"
                  value={formData.item}
                  onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                  className="input"
                />
              </label>
              <label>
                Tipo:
                <input
                  type="text"
                  name="tipo"
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  className="input"
                />
              </label>
              <label>
                Preço de Compra/Unidade(R$):
                <input
                  type="number"
                  name="preco_compra"
                  value={formData.preco_compra}
                  onChange={(e) => setFormData({ ...formData, preco_compra: e.target.value })}
                  onWheel={(e) => e.target.blur()}
                  className="input"
                />
              </label>
              <label>
                Preço de Venda/Unidade(R$):
                <input
                  type="number"
                  name="preco_venda"
                  value={formData.preco_venda}
                  onChange={(e) => setFormData({ ...formData, preco_venda: e.target.value })}
                  onWheel={(e) => e.target.blur()}
                  className="input"
                />
              </label>
              <label>
                Data de Entrada:
                <input
                  type="date"
                  name="data_entrada"
                  value={formData.data_entrada}
                  onChange={(e) => setFormData({ ...formData, data_entrada: e.target.value })}
                  className="input"
                />
              </label>
              <label>
                  Quantidade de Entrada:
                  <input
                    type="number"
                    name="qtde_entrada"
                    value={formData.qtde_entrada}
                    onChange={(e) => setFormData({ ...formData, qtde_entrada: e.target.value })}
                    onWheel={(e) => e.target.blur()}
                    className="input"
                  />
                </label>
              <label>
                Funcionário:
                <select
                  name="cod_funcionario"
                  value={formData.cod_funcionario}
                  onChange={(e) => setFormData({ ...formData, cod_funcionario: e.target.value })}
                  className="input"
                >
                  <option value="">Selecione um Funcionário</option>
                  {funcionarios.map(funcionario => (
                    <option key={funcionario.codigo} value={funcionario.codigo}>
                      {funcionario.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Observações:
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
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