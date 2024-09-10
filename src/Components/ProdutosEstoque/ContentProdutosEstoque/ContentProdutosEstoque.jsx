import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentProdutosEstoque.css';

export default function ContentProdutosEstoque() {
  const [produtosEstoque, setProdutosEstoque] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    item: '',
    tipo: '',
    observacoes: '',
    preco_compra: '',
    preco_venda: '',
    data_entrada: '',
    qntd_entrada: '',
    cod_produto: '',
    cod_fornecedor: '',
  });
  const [editingProdutoEstoque, setEditingProdutoEstoque] = useState(null);

  useEffect(() => {
    fetchProdutosEstoque();
  }, []);

  const fetchProdutosEstoque = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/produtos_estoque');
      setProdutosEstoque(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos de estoque:', error);
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
      observacoes: '',
      preco_compra: '',
      preco_venda: '',
      data_entrada: '',
      qntd_entrada: '',
      cod_produto: '',
      cod_fornecedor: '',
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
    setEditingProdutoEstoque(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProdutoEstoque) {
        await axios.put(`http://localhost:3000/produtos_estoque/${editingProdutoEstoque}`, formData);
        alert('Produto de estoque atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:3000/produtos_estoque', formData);
        alert('Produto de estoque cadastrado com sucesso!');
      }
      fetchProdutosEstoque();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar produto de estoque:', error);
      alert('Erro ao cadastrar/atualizar produto de estoque.');
    }
  };

  const handleDelete = async (codigo) => {
    if (window.confirm("Tem certeza que deseja excluir este produto de estoque?")) {
      try {
        await axios.delete(`http://localhost:3000/produtos_estoque/${codigo}`);
        fetchProdutosEstoque();
      } catch (error) {
        console.error('Erro ao deletar produto de estoque:', error);
        alert('Erro ao deletar produto de estoque.');
      }
    }
  };

  const handleEdit = (produto) => {
    setEditingProdutoEstoque(produto.codigo);
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
      <h2 className="title">Produtos de Estoque</h2>
      <button className="button" onClick={handleOpenModal}>
        Novo Produto de Estoque
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Item</th>
            <th>Tipo</th>
            <th>Observações</th>
            <th>Preço Compra</th>
            <th>Preço Venda</th>
            <th>Data Entrada</th>
            <th>Quantidade Entrada</th>
            <th>Código Produto</th>
            <th>Código Fornecedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtosEstoque.map((produto) => (
            <tr key={produto.codigo}>
              <td>{produto.codigo}</td>
              <td>{produto.item}</td>
              <td>{produto.tipo}</td>
              <td>{produto.observacoes}</td>
              <td>{produto.preco_compra}</td>
              <td>{produto.preco_venda}</td>
              <td>{produto.data_entrada}</td>
              <td>{produto.qntd_entrada}</td>
              <td>{produto.cod_produto}</td>
              <td>{produto.cod_fornecedor}</td>
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
      {/* Modal para adicionar/editar produtos de estoque */}
      <div className="modal-container" style={{ display: modalVisible ? 'block' : 'none' }}>
        <div className="modal">
          <h2 className="modal-title">
            {editingProdutoEstoque ? 'Editar Produto de Estoque' : 'Novo Produto de Estoque'}
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
              type="date"
              placeholder="Data Entrada"
              name="data_entrada"
              value={formData.data_entrada}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              placeholder="Quantidade Entrada"
              name="qntd_entrada"
              value={formData.qntd_entrada}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              placeholder="Código Produto"
              name="cod_produto"
              value={formData.cod_produto}
              onChange={handleChange}
              className="input"
            />
            <input
              type="number"
              placeholder="Código Fornecedor"
              name="cod_fornecedor"
              value={formData.cod_fornecedor}
              onChange={handleChange}
              className="input"
            />
            <button type="submit" className="button">
              {editingProdutoEstoque ? 'Atualizar' : 'Cadastrar'}
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