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
    status: '', // Campo status
    quantidade: '',
    foto: '',
    observacoes: '',
    cod_estoque: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [imagePreview, setImagePreview] = useState(''); // Novo estado para preview de imagem

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
      setFormData({
        ...item,
      });
      setImagePreview(item.foto || ''); // Define o preview de imagem ao editar
    } else {
      setFormData({
        codigo: '',
        item: '',
        tipo: '',
        preco_atual: '',
        preco_antigo: '',
        status: '', // Campo status
        quantidade: '',
        foto: '',
        observacoes: '',
        cod_estoque: '',
      });
      setImagePreview(''); // Limpa o preview de imagem ao adicionar
    }
    setModalType(type);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalType(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, foto: reader.result });
        setImagePreview(reader.result); // Atualiza o preview de imagem
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsert = () => {
    postProduto(formData);
  };

  const postProduto = (data) => {
    axios.post('http://localhost:3000/produtos', data)
      .then(() => {
        fetchProdutos();
        handleCloseModal();
        alert('Produto cadastrado com sucesso!');
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          alert('Erro: O código do produto já existe. Por favor, escolha um código diferente.');
        } else {
          console.error('Erro ao cadastrar produto:', error.response ? error.response.data : error.message);
          alert('Erro ao cadastrar produto.');
        }
      });
  };

  const handleUpdate = () => {
    putProduto(formData);
  };

  const putProduto = (data) => {
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
          alert(error.response && error.response.data.error ? error.response.data.error : 'Erro ao deletar produto.');
        });
    }
  };

  const fieldLabels = {
    codigo: 'Código',
    item: 'Item',
    tipo: 'Tipo',
    preco_atual: 'Preço Atual',
    preco_antigo: 'Preço Antigo',
    status: 'Status', // Campo status
    quantidade: 'Quantidade',
    foto: 'Foto',
    observacoes: 'Observações',
    cod_estoque: 'Código do Estoque',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const filteredProdutos = produtos.filter(item =>
    (item.item && item.item.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (item.codigo && item.codigo.toString().toLowerCase().includes(searchQuery.toLowerCase()))
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
      </div>
      <div className="controls">
        <input
          type="text"
          placeholder="Pesquisar por Item ou código do produto..."
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
            <th>Preço Atual</th>
            <th>Preço Antigo</th>
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
            <td>R${item.preco_atual ? item.preco_atual.toFixed(2) : 'N/A'}</td>
            <td>R${item.preco_antigo ? item.preco_antigo.toFixed(2) : 'N/A'}</td>
            <td>{item.status}</td>
            <td>{item.quantidade}</td>
            <td><img src={item.foto} alt={item.item} className="foto-produto" /></td>
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
            <form onSubmit={handleSubmit} className="form">
              <label>
                Código:
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                  className="input"
                  disabled={modalType === 'edit'}
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
                Preço Atual:
                <input
                  type="number"
                  name="preco_atual"
                  value={formData.preco_atual}
                  onChange={(e) => setFormData({ ...formData, preco_atual: parseFloat(e.target.value) })}
                  className="input"
                  step="0.01"
                />
              </label>
              <label>
                Preço Antigo:
                <input
                  type="number"
                  name="preco_antigo"
                  value={formData.preco_antigo}
                  onChange={(e) => setFormData({ ...formData, preco_antigo: parseFloat(e.target.value) })}
                  className="input"
                  step="0.01"
                />
              </label>
              <label>
                Status:
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input"  // Adiciona a classe 'input' para estilização
                >
                  <option value="">Selecione um status</option>
                  <option value="Disponível">Disponível</option>
                  <option value="Indisponível">Indisponível</option>
                </select>
              </label>
              <label>
                Quantidade:
                <input
                  type="number"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={(e) => setFormData({ ...formData, quantidade: parseInt(e.target.value, 10) })}
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
                <input
                  type="text"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  className="input"
                />
              </label>
              <label>
                Código do Estoque:
                <input
                  type="number"
                  name="cod_estoque"
                  value={formData.cod_estoque}
                  onChange={(e) => setFormData({ ...formData, cod_estoque: parseInt(e.target.value, 10) })}
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