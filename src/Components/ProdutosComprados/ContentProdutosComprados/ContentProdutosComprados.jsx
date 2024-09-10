import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentProdutosComprados.css';

export default function ContentProdutosComprados() {
  const [produtosComprados, setProdutosComprados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    item: '',
    tipo: '',
    fornecedor: '',
    quantidade: '',
    preco: '',
    data_compra: '',
  });
  const [editingProdutoComprado, setEditingProdutoComprado] = useState(null);

  useEffect(() => {
    fetchProdutosComprados();
  }, []);

  const fetchProdutosComprados = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/produtos_comprados');
      setProdutosComprados(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos comprados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    setFormData({
      codigo: '',
      item: '',
      tipo: '',
      fornecedor: '',
      quantidade: '',
      preco: '',
      data_compra: '',
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
    setEditingProdutoComprado(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProdutoComprado) {
        await axios.put(`http://localhost:3000/produtos_comprados/${editingProdutoComprado}`, formData);
        alert('Produto comprado atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:3000/produtos_comprados', formData);
        alert('Produto comprado cadastrado com sucesso!');
      }
      fetchProdutosComprados();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar produto comprado:', error);
      alert('Erro ao cadastrar/atualizar produto comprado.');
    }
  };

  const handleDelete = async (codigo) => {
    if (window.confirm("Tem certeza que deseja excluir este produto comprado?")) {
      try {
        await axios.delete(`http://localhost:3000/produtos_comprados/${codigo}`);
        fetchProdutosComprados();
      } catch (error) {
        console.error('Erro ao deletar produto comprado:', error);
        alert('Erro ao deletar produto comprado.');
      }
    }
  };

  const handleEdit = (produto) => {
    setEditingProdutoComprado(produto.codigo);
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
      <h2 className="title">Produtos Comprados</h2>
      <button className="button" onClick={handleOpenModal}>
        Novo Produto Comprado
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Item</th>
            <th>Tipo</th>
            <th>Fornecedor</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Data Compra</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtosComprados.map((produto) => (
            <tr key={produto.codigo}>
              <td>{produto.codigo}</td>
              <td>{produto.item}</td>
              <td>{produto.tipo}</td>
              <td>{produto.fornecedor}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.preco}</td>
              <td>{produto.data_compra}</td>
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
      {/* Modal para adicionar/editar produtos comprados */}
      <div className="modal-container" style={{ display: modalVisible ? 'block' : 'none' }}>
        <div className="modal">
          <h2 className="modal-title">
            {editingProdutoComprado ? 'Editar Produto Comprado' : 'Novo Produto Comprado'}
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
              placeholder="Tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              placeholder="Fornecedor"
              name="fornecedor"
              value={formData.fornecedor}
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
            <input
              type="number"
              placeholder="Preço"
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              className="input"
            />
            <input
              type="date"
              placeholder="Data Compra"
              name="data_compra"
              value={formData.data_compra}
              onChange={handleChange}
              className="input"
            />
            <button type="submit" className="button">
              {editingProdutoComprado ? 'Atualizar' : 'Cadastrar'}
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
