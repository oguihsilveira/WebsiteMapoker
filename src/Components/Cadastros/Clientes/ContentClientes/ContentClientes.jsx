import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentClientes.css';

export default function ContentClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    axios.get('http://localhost:3000/clientes')
      .then(response => {
        if (Array.isArray(response.data.clientes)) {
          setClientes(response.data.clientes);
        } else {
          console.error('Formato inesperado da resposta da API:', response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar clientes:', error);
        setLoading(false);
      });
  };

  const handleDelete = (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      axios.delete('http://localhost:3000/clientes', { params: { codigo } })
        .then(response => {
          fetchClientes();
          alert('Cliente excluído com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao deletar cliente:', error.response ? error.response.data : error.message);
          alert('Erro ao deletar cliente.');
        });
    }
  };

  const filteredClientes = Array.isArray(clientes) ? clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cliente.login.toLowerCase().includes(searchQuery.toLowerCase())
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
      <h2 className="title">Clientes</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Pesquisar por nome ou login..."
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
            <th>Empresa</th>
            <th>Email</th>
            <th>Login</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map((cliente) => (
            <tr key={cliente.codigo}>
              <td>{cliente.codigo}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.empresa}</td> {/* Exibição do nome da empresa */}
              <td>{cliente.email}</td> {/* Exibição do email */}
              <td>{cliente.login}</td>

              <td className="actions">
                <button className="button" onClick={() => handleDelete(cliente.codigo)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}