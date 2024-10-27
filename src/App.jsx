//Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home"; //Possui diversos componentes
import LoginCliente from "./Components/LoginCliente/LoginCliente"; //Login exclusivo dos clientes
import ProdutosLoja from "./Components/ProdutosLoja/ProdutosLoja";
import Galeria from './Components/Galeria/Galeria';


//Cadastros Gerais
import CadastrosGerais from "./Components/CadastrosGerais/CadastrosGerais";

//Cadastros específicos
import Funcionarios from "./Components/Cadastros/Funcionarios/Funcionarios"; //Funcionários da Empresa
import Usuarios from "./Components/Cadastros/Usuarios/Usuarios"; //Usuários Administradores do Sistema
import Estoque from "./Components/Cadastros/Estoque/Estoque"; //Cadastro e Gestão de Estoque & Inventário da Empresa
import Produtos from './Components/Cadastros/Produtos/Produtos'; //Cadastro e Gestão Produtos na Loja
import Clientes from './Components/Cadastros/Clientes/Clientes'; //Visualizar Clientes
/* import Pedidos from "./Components/Clientes/Pedidos/Pedidos"; */ //Pedidos dos Clientes na Loja
/* import Vendas from "./Components/Clientes/Vendas/Vendas"; */ //Pedidos dos Clientes na Loja
import Pagamentos from "./Components/Cadastros/Pagamentos/Pagamentos";
import Parcelas from './Components/Cadastros/Parcelas/Parcelas';
//Relatório Financeiro Geral
/* import Relatorio from "./Components/Relatorio/Relatorio"; //Relatório de contas dos clientes e estoque */

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/login-clientes" element={<LoginCliente />} />
        <Route path="produtos-loja" element={<ProdutosLoja />} />
        <Route path="/cadastros-gerais" element={<CadastrosGerais />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/usuarios-adm" element={<Usuarios />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route path="/parcelas" element={<Parcelas />} />
        {/* Relatório financeiro */}
      </Routes>
    </Router>
  );
};

export default App;