import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Galeria from './Components/Galeria/Galeria';
import LoginCliente from "./Components/LoginCliente/LoginCliente";
import CadastrosGerais from "./Components/CadastrosGerais/CadastrosGerais";
import Funcionarios from "./Components/Funcionarios/Funcionarios"; // Importe o componente Funcionarios
import Usuarios from "./Components/Usuarios/Usuarios"; // Importe o componente Usuarios
import Estoque from "./Components/Estoque/Estoque"
import ContasPagamentos from "./Components/ContasPagamentos/ContasPagamentos"; // Importe Contas e Pagamentos
import ParcelasPagar from "./Components/ParcelasPagar/ParcelasPagar"; // Importe Parcelas a Pagar


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/login-clientes" element={<LoginCliente />} />
        <Route path="/cadastros-gerais" element={<CadastrosGerais />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/usuarios-erp" element={<Usuarios />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/contas-pagamentos" element={<ContasPagamentos />} />
        <Route path="/parcelas-pagar" element={<ParcelasPagar />} />

      </Routes>
    </Router>
  );
};

export default App;