//Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import LoginCliente from "./Components/LoginCliente/LoginCliente";
/* import ProdutosExibidos from "./Components/rota-de-produtos"; */
import Galeria from './Components/Galeria/Galeria';


//Cadastros Gerais
import CadastrosGerais from "./Components/CadastrosGerais/CadastrosGerais";

//Cadastros específicos
import Funcionarios from "./Components/Cadastros/Funcionarios/Funcionarios";
import Usuarios from "./Components/Cadastros/Usuarios/Usuarios";
import Estoque from "./Components/Cadastros/Estoque/Estoque";
import Produtos from './Components/Cadastros/Produtos/Produtos'; //cadastrar produtos
/* import Clientes from "./Components/Clientes/"; */ //Visualizar clientes
/* import Pedidos from "./Components/Clientes/Pedidos/Pedidos"; */ //Pedidos vindos dos clientes
import Pagamentos from "./Components/Cadastros/Pagamentos/Pagamentos";
import Parcelas from './Components/Cadastros/Parcelas/Parcelas';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/login-clientes" element={<LoginCliente />} />
        <Route path="/cadastros-gerais" element={<CadastrosGerais />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/usuarios-adm" element={<Usuarios />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/produtos" element={<Produtos />} />
        {/* Clientes */}
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route path="/parcelas" element={<Parcelas />} />
        {/* Relatório financeiro */}
      </Routes>
    </Router>
  );
};

export default App;