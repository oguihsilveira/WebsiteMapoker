import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentProdutos.css';

export default function ContentProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add' or 'edit'
  const [formData, setFormData] = useState({
    codigo: '',
    item: '',
    tipo: '',
    preco_atual: '',
    preco_antigo: '',
    status: '',
    quantidade: '',
    foto: '',
    observacoes: '',
    cod_estoque: '',
  });
  const [searchQuery, setSearchQuery] = useState([]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = () => {
    axios.get('http://localhost:3000/produtos')
      .then(response => {
        if (Array.isArray(response.data.produtos)) {
          setProdutos(response.data.produtos);
        } else {
          console.error('Formato inesperado da resposta da API:', response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar produtos:', error);
        setLoading(false);
      });
  };

  const handleOpenModal = (type, item = null) => {
    if (type === 'edit' && item) {
      setFormData(item);
    } else {
      setFormData({
        codigo: '',
        item: '',
        tipo: '',
        preco_atual: '',
        preco_antigo: '',
        status: '',
        quantidade: '',
        foto: '',
        observacoes: '',
        cod_estoque: '',
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
    postProdutos(formData);
  };

  const postProdutos = (data) => {
    axios.post('http://localhost:3000/produtos', data)
      .then(() => {
        fetchProdutos();
        handleCloseModal();
        alert('Produto cadastrado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao cadastrar produto:', error.response ? error.response.data : error.message);
        alert('Erro ao cadastrar produto.');
      });
  };

  const handleUpdate = () => {
    putProdutos(formData);
  };

  const putProdutos = (data) => {
    axios.put('http://localhost:3000/produtos', data, { params: { codigo: data.codigo } })
      .then(() => {
        fetchProdutos();
        handleCloseModal();
        alert('Produto atualizado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao atualizar produto:', error.response ? error.response.data : error.message);
        alert('Erro ao atualizar produto.');
      });
  };

  const handleDelete = (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      axios.delete('http://localhost:3000/produtos', { params: { codigo } })
        .then(() => {
          fetchProdutos();
          alert('Produto excluído com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao deletar produto:', error.response ? error.response.data : error.message);
          alert('Erro ao deletar produto.');
        });
    }
  };

  const filteredProdutos = produtos.filter(item =>
    item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.codigo.toString().toLowerCase().includes(searchQuery.toLowerCase())
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
      <h2 className="title">Produtos</h2>

      <div className="controls">
        <button className="button add-button" onClick={() => handleOpenModal('add')}>
          Adicionar Novo Produto
        </button>
        <input
          type="text"
          placeholder="Pesquisar por nome ou código..."
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
            <th>Preço Atual (R$)</th>
            <th>Preço Antigo (R$)</th>
            <th>Status</th>
            <th>Quantidade</th>
            <th>Foto</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredProdutos.map((item) => (
            <tr key={item.codigo}>
              <td>{item.codigo}</td>
              <td>{item.item}</td>
              <td>{item.tipo}</td>
              <td>R${item.preco_atual.toFixed(2)}</td>
              <td>{item.preco_antigo ? `R$${item.preco_antigo.toFixed(2)}` : '-'}</td>
              <td>{item.status}</td>
              <td>{item.quantidade}</td>
              <td><img src={item.foto} alt={item.item} className="produto-foto" /></td>
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
            <h2 className="modal-title">{modalType === 'edit' ? 'Editar Produto' : 'Novo Produto'}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              modalType === 'add' ? handleInsert() : handleUpdate();
            }} className="form">
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
                Preço Atual (R$):
                <input
                  type="number"
                  name="preco_atual"
                  value={formData.preco_atual}
                  onChange={(e) => setFormData({ ...formData, preco_atual: e.target.value })}
                  onWheel={(e) => e.target.blur()}
                  className="input"
                />
              </label>
              <label>
                Preço Antigo (R$):
                <input
                  type="number"
                  name="preco_antigo"
                  value={formData.preco_antigo}
                  onChange={(e) => setFormData({ ...formData, preco_antigo: e.target.value })}
                  onWheel={(e) => e.target.blur()}
                  className="input"
                />
              </label>
              <label>
                Status:
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input"
                />
              </label>
              <label>
                Quantidade:
                <input
                  type="number"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                  onWheel={(e) => e.target.blur()}
                  className="input"
                />
              </label>
              <label>
                Foto:
                <input
                  type="text"
                  name="foto"
                  value={formData.foto}
                  onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
                  className="input"
                />
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
              <label>
                Código do Estoque:
                <input
                  type="text"
                  name="cod_estoque"
                  value={formData.cod_estoque}
                  onChange={(e) => setFormData({ ...formData, cod_estoque: e.target.value })}
                  className="input"
                />
              </label>
              <div className="modal-buttons">
                <button type="button" className="button cancel-button" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button type="submit" className="button submit-button">
                  {modalType === 'add' ? 'Cadastrar' : 'Atualizar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
