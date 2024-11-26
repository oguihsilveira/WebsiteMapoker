import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentProdutos.css';

export default function ContentProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({
    codigo: '',
    item: '',
    tipo: '',
    preco_padrao: '',
    desconto: '',
    status: '',
    quantidade: '',
    foto: '',
    observacoes: '',
    cod_estoque: '', // Alterado para um select
  });

  const [estoque, setEstoque] = useState([]); // Estado para armazenar os estoques
  const [searchQuery, setSearchQuery] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Filtragem de produtos com base na pesquisa
  const filteredProdutos = produtos.filter(item =>
    (item.item && item.item.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (item.codigo && item.codigo.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  ).reverse();

  useEffect(() => {
    fetchProdutos();
    fetchEstoque(); // Chama a função para buscar os estoques
  }, []);

  // Função para buscar produtos
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

  // Função para buscar os estoques disponíveis
  const fetchEstoque = () => {
    axios.get('http://localhost:3000/estoque')
        .then(response => {
            if (Array.isArray(response.data.estoque)) {
                setEstoque(response.data.estoque);
            } else {
                console.error('Formato inesperado da resposta da API:', response.data);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar estoque:', error);
        });
  };

  const handleOpenModal = (type, item = null) => {
    if (type === 'edit' && item) {
      setFormData({ ...item });
      setImagePreview(item.foto || '');
    } else {
      setFormData({
        codigo: '',
        item: '',
        tipo: '',
        preco_padrao: '',
        desconto: '',
        status: '',
        quantidade: '',
        foto: '',
        observacoes: '',
        cod_estoque: '', // Limpa o campo do estoque
      });
      setImagePreview('');
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
      setFormData({ ...formData, foto: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInsert = () => {
    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });
    postProduto(formDataObj);
  };

  const postProduto = (data) => {
    axios.post('http://localhost:3000/produtos', data, { headers: { 'Content-Type': 'multipart/form-data' } })
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
    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });
    putProduto(formDataObj);
  };

  const putProduto = (data) => {
    axios.put('http://localhost:3000/produtos', data, {
      params: { codigo: formData.codigo },
      headers: { 'Content-Type': 'multipart/form-data' }
    })
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['codigo', 'item', 'tipo', 'preco_padrao','desconto', 'status', 'quantidade', 'cod_estoque'];
    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      alert(`Por favor, preencha os seguintes campos: ${emptyFields.join(', ')}`);
      return;
    }

    if (modalType === 'add') {
      handleInsert();
    } else if (modalType === 'edit') {
      handleUpdate();
    }
  };

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
            <th>Preço/Unidade (R$)</th>
            <th>Desconto (%)</th>
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
              <td className="preco-padrao">
                {/* Formatação do preço original */}
                R${item.preco_padrao ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(parseFloat(item.preco_padrao)) : 'N/A'}: Original
                <br />
                {/* Formatação do preço com desconto */}
                R${item.preco_padrao && item.desconto && parseFloat(item.desconto) > 0
                  ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(parseFloat(item.preco_padrao) * (1 - parseFloat(item.desconto) / 100))
                  : item.preco_padrao
                  ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(parseFloat(item.preco_padrao))
                  : 'N/A'
                }: Descontado
              </td>
              <td className='desconto'>{(parseFloat(item.desconto) || 0)}%</td>
              <td>{item.status}</td>
              <td>{item.quantidade}</td>
              <td>
                {item.foto ? (
                  <img
                    src={item.foto}
                    alt={item.item}
                    className="foto-produto"
                    onClick={() => window.open(item.foto, '_blank')}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <span>Nenhuma foto disponível</span>
                )}
              </td>
              <td>{item.observacoes}</td>
              <td className="actions">
                <button onClick={() => handleOpenModal('edit', item)} className='button'>Editar</button>
                <button onClick={() => handleDelete(item.codigo)} className='button'>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {modalVisible && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2 className="modal-title">
        {modalType === 'add' ? 'Adicionar Produto' : 'Editar Produto'}
      </h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="controls">
          <label>Código</label>
          <input
            className="input"
            type="number"
            value={formData.codigo}
            onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
            required
          />

          <label>Item</label>
          <input
            className="input"
            type="text"
            value={formData.item}
            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
            required
          />

          <label>Tipo</label>
          <input
            className="input"
            type="text"
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            required
          />

          <label>Preço Padrão (R$)</label>
          <input
            className="input"
            type="number"
            value={formData.preco_padrao}
            onChange={(e) => setFormData({ ...formData, preco_padrao: e.target.value })}
            onWheel={(e) => e.target.blur()}
            required
          />

          <label>Desconto (%)</label>
          <input
            className="input"
            type="number"
            value={formData.desconto}
            onChange={(e) => setFormData({ ...formData, desconto: e.target.value })}
            onWheel={(e) => e.target.blur()}
          />

          <label>Status</label>
          <select
            className="input"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            required
          >
            <option value="Disponível">Disponível</option>
            <option value="Indisponível">Indisponível</option>
          </select>

          <label>Quantidade</label>
          <input
            className="input"
            type="number"
            value={formData.quantidade}
            onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
            onWheel={(e) => e.target.blur()}
            required
          />

          <label>Estoque</label>
          <select
            className="input"
            value={formData.cod_estoque}
            onChange={(e) => setFormData({ ...formData, cod_estoque: e.target.value })}
            required
          >
            <option value="">Selecione um estoque</option>
            {estoque.map((item) => (
              <option key={item.codigo} value={item.codigo}>
                {item.item} {/* Mostrando o nome do estoque, ajuste conforme necessário */}
              </option>
            ))}
          </select>

          <label>Foto</label>
          <label className="upload-button">
          Escolher Foto
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}  // Oculta o campo de input
          />
          </label>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="preview-img"
            />
          )}

          <label>Observações</label>
          <input
            className="input"
            type="text"
            value={formData.observacoes}
            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
          />
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="button cancel-button"
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="button save-button"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}

/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentProdutos.css';

export default function ContentProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({
    codigo: '',
    item: '',
    tipo: '',
    preco_padrao: '',
    desconto: '',
    status: '',
    quantidade: '',
    foto: '',
    observacoes: '',
    cod_estoque: '', // Esse será substituído por um select mais tarde
  });

  const [estoque, setEstoque] = useState([]); // Estado para armazenar os estoque
  const [searchQuery, setSearchQuery] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Filtragem de produtos com base na pesquisa
  const filteredProdutos = produtos.filter(item =>
    (item.item && item.item.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (item.codigo && item.codigo.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  ).reverse();

  useEffect(() => {
    fetchProdutos();
    fetchEstoque(); // Chama a função para buscar os estoque
  }, []);

  // Função para buscar produtos
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

  // Função para buscar os estoque disponíveis
  const fetchEstoque = () => {
    axios.get('http://localhost:3000/estoque')
        .then(response => {
            if (Array.isArray(response.data.estoque)) {
                setEstoque(response.data.estoque);
            } else {
                console.error('Formato inesperado da resposta da API:', response.data);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar estoque:', error);
        });
  };

  const handleOpenModal = (type, item = null) => {
    if (type === 'edit' && item) {
      console.log(item)
      setFormData({ ...item });
      setImagePreview(item.foto || '');
    } else {
      setFormData({
        codigo: '',
        item: '',
        tipo: '',
        preco_padrao: '',
        desconto: '',
        status: '',
        quantidade: '',
        foto: '',
        observacoes: '',
        cod_estoque: '',
      });
      setImagePreview('');
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
    setFormData({ ...formData, foto: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleInsert = () => {
    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });
    postProduto(formDataObj);
  };

  const postProduto = (data) => {
    axios.post('http://localhost:3000/produtos', data, { headers: { 'Content-Type': 'multipart/form-data' } })
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
    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });
    putProduto(formDataObj);
  };

  const putProduto = (data) => {
    axios.put('http://localhost:3000/produtos', data, {
      params: { codigo: formData.codigo },
      headers: { 'Content-Type': 'multipart/form-data' }
    })
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['codigo', 'item', 'tipo', 'preco_padrao','desconto', 'status', 'quantidade', 'cod_estoque'];
    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      alert(`Por favor, preencha os seguintes campos: ${emptyFields.join(', ')}`);
      return;
    }

    if (modalType === 'add') {
      handleInsert();
    } else if (modalType === 'edit') {
      handleUpdate();
    }
  };

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
            <th>Preço/Unidade (R$)</th>
            <th>Desconto (%)</th>
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
      <td className='preco-padrao'>
        R${item.preco_padrao ? parseFloat(item.preco_padrao).toFixed(2) : 'N/A'}: Original
        <br />
        R${item.preco_padrao && item.desconto && parseFloat(item.desconto) > 0
          ? (parseFloat(item.preco_padrao) * (1 - parseFloat(item.desconto) / 100)).toFixed(2)
          : parseFloat(item.preco_padrao)?.toFixed(2)
        }: Descontado
      </td>
      <td className='desconto'>{(parseFloat(item.desconto) || 0)}%</td>
      <td>{item.status}</td>
      <td>{item.quantidade}</td>
      <td>
        {item.foto ? (
          <img
            src={item.foto}
            alt={item.item}
            className="foto-produto"
            onClick={() => window.open(item.foto, '_blank')}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <span>Nenhuma foto disponível</span>
        )}
      </td>
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
                Preço Padrão/Unidade:
                <input
                  type="number"
                  name="preco_padrao"
                  placeholder="R$"
                  value={formData.preco_padrao}
                  onChange={(e) => setFormData({ ...formData, preco_padrao: parseFloat(e.target.value) })}
                  onWheel={(e) => e.target.blur()}
                  className="input"
                />
              </label>
              <label>
                Desconto (%):
                <input
                  type="number"
                  name="desconto"
                  value={formData.desconto}
                  onChange={(e) => setFormData({ ...formData, desconto: e.target.value })}
                  onWheel={(e) => e.target.blur()} // Para evitar mudanças indesejadas ao rolar o mouse
                  className="input"
                />
              </label>
              <label>
                Status:
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input"
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
                  onWheel={(e) => e.target.blur()} // Para evitar mudanças indesejadas ao rolar o mouse
                  className="input"
                />
              </label>
              <div className="form-group">
                <label>Foto:</label>
                <label className="custom-file-upload">
                  <input
                    type="file"
                    name="foto"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  Selecione uma imagem
                </label>
              </div>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="modal-image" />
              )}
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
              <div>
              <label>
                Item do Estoque:
                <select
                  value={formData.cod_estoque}
                  onChange={(e) => setFormData({ ...formData, cod_estoque: e.target.value })}
                  required
                  className="input"
                >
                  <option value="">Selecione um item estoque</option>
                  {estoque.map((estoque) => (
                    <option key={estoque.codigo} value={estoque.codigo}>
                      {estoque.item}
                    </option>
                  ))}
                </select>
              </label>
              </div>
              <div className="form-buttons">
                <button type="submit" className="button">
                  {modalType === 'edit' ? 'Atualizar' : 'Cadastrar'}
                </button>
                <button type="button" className="button " onClick={handleCloseModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} */