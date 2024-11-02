// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import LoginCliente from "./Components/LoginCliente/LoginCliente";
import ProdutosLoja from "./Components/ProdutosLoja/ProdutosLoja";
import Galeria from './Components/Galeria/Galeria';
import CadastrosGerais from "./Components/CadastrosGerais/CadastrosGerais";
import Funcionarios from "./Components/Cadastros/Funcionarios/Funcionarios";
import Usuarios from "./Components/Cadastros/Usuarios/Usuarios";
import Estoque from "./Components/Cadastros/Estoque/Estoque";
import Produtos from './Components/Cadastros/Produtos/Produtos';
import Clientes from './Components/Cadastros/Clientes/Clientes';
import Pagamentos from "./Components/Cadastros/Pagamentos/Pagamentos";
import Parcelas from './Components/Cadastros/Parcelas/Parcelas';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/login-clientes" element={<LoginCliente />} />

        {/* Rotas protegidas */}
        <Route 
          path="/produtos-loja" 
          element={
            <PrivateRoute allowedRoles={['admin', 'cliente']}> {/* Exemplo de roles permitidas */}
              <ProdutosLoja />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/cadastros-gerais" 
          element={
            <PrivateRoute allowedRoles={['admin']}> {/* Somente admin pode acessar */}
              <CadastrosGerais />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/funcionarios" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Funcionarios />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/usuarios-adm" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Usuarios />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/estoque" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Estoque />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/produtos" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Produtos />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/clientes" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Clientes />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/pagamentos" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Pagamentos />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/parcelas" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Parcelas />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
