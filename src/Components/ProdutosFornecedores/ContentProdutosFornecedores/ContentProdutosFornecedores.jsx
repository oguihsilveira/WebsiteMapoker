import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentProdutosFornecedores.css';

export default function ContentProdutosFornecedores() {
  const [produtosFornecedores, setProdutosFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    item: '',
    marca: '',
    tipo: '',
    observacoes: '',
    preco_compra: '',
    preco_venda: '',
    status: '',
    quantidade: '',
  });
  const [editingProdutoFornecedor, setEditingProdutoFornecedor] = useState(null);

  useEffect(() => {
    fetchProdutosFornecedores();
  }, []);

  const fetchProdutosFornecedores = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/produtos_fornecedores');
      setProdutosFornecedores(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos de fornecedores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    setFormData({
      codigo: '',
      item: '',
      marca: '',
      tipo: '',
      observacoes: '',
      preco_compra: '',
      preco_venda: '',
      status: '',
      quantidade: '',
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
    setEditingProdutoFornecedor(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProdutoFornecedor) {
        await axios.put(`http://localhost:3000/produtos_fornecedores/${editingProdutoFornecedor}`, formData);
        alert('Produto de fornecedor atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:3000/produtos_fornecedores', formData);
        alert('Produto de fornecedor cadastrado com sucesso!');
      }
      fetchProdutosFornecedores();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar produto de fornecedor:', error);
      alert('Erro ao cadastrar/atualizar produto de fornecedor.');
    }
  };

  const handleDelete = async (codigo) => {
    if (window.confirm("Tem certeza que deseja excluir este produto de fornecedor?")) {
      try {
        await axios.delete(`http://localhost:3000/produtos_fornecedores/${codigo}`);
        fetchProdutosFornecedores();
      } catch (error) {
        console.error('Erro ao deletar produto de fornecedor:', error);
        alert('Erro ao deletar produto de fornecedor.');
      }
    }
  };

  const handleEdit = (produto) => {
    setEditingProdutoFornecedor(produto.codigo);
    setFormData(produto);
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
      <h2 className="title">Produtos de Fornecedores</h2>
      <button className="button" onClick={handleOpenModal}>
        Novo Produto de Fornecedor
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Item</th>
            <th>Marca</th>
            <th>Tipo</th>
            <th>Observações</th>
            <th>Preço Compra</th>
            <th>Preço Venda</th>
            <th>Status</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtosFornecedores.map((produto) => (
            <tr key={produto.codigo}>
              <td>{produto.codigo}</td>
              <td>{produto.item}</td>
              <td>{produto.marca}</td>
              <td>{produto.tipo}</td>
              <td>{produto.observacoes}</td>
              <td>{produto.preco_compra}</td>
              <td>{produto.preco_venda}</td>
              <td>{produto.status}</td>
              <td>{produto.quantidade}</td>
              <td>
                <button className="button" onClick={() => handleEdit(produto)}>
                  Editar
                </button>
                <button className="button" onClick={() => handleDelete(produto.codigo)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para adicionar/editar produtos de fornecedores */}
      <div className="modal-container" style={{ display: modalVisible ? 'block' : 'none' }}>
        <div className="modal">
          <h2 className="modal-title">
            {editingProdutoFornecedor ? 'Editar Produto de Fornecedor' : 'Novo Produto de Fornecedor'}
          </h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Item"
              name="item"
              value={formData.item}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              placeholder="Marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              placeholder="Tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              placeholder="Observações"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              placeholder="Preço Compra"
              name="preco_compra"
              value={formData.preco_compra}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              placeholder="Preço Venda"
              name="preco_venda"
              value={formData.preco_venda}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              placeholder="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              placeholder="Quantidade"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              className="input"
            />
            <button type="submit" className="button">
              {editingProdutoFornecedor ? 'Atualizar' : 'Cadastrar'}
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