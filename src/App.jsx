import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import CadastrosGerais from "./Components/CadastrosGerais/CadastrosGerais";
import Fornecedores from "./Components/Fornecedores/Fornecedores"; // Importe o componente Fornecedores
import Funcionarios from "./Components/Funcionarios/Funcionarios"; // Importe o componente Funcionarios
import Usuarios from "./Components/Usuarios/Usuarios"; // Importe o componente Usuarios
import ProdutosFornecedores from "./Components/ProdutosFornecedores/ProdutosFornecedores"; // Importe Produtos dos Fornecedores
import ProdutosComprados from "./Components/ProdutosComprados/ProdutosComprados"; // Importe Produtos Comprados
import ProdutosEstoque from "./Components/ProdutosEstoque/ProdutosEstoque"; // Importe Produtos em Estoque
import ContasPagamentos from "./Components/ContasPagamentos/ContasPagamentos"; // Importe Contas e Pagamentos
import ParcelasPagar from "./Components/ParcelasPagar/ParcelasPagar"; // Importe Parcelas a Pagar
import Galeria from './Components/Galeria/Galeria';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrosgerais" element={<CadastrosGerais />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/usuarios-erp" element={<Usuarios />} />
        <Route path="/produtos-fornecedores" element={<ProdutosFornecedores />} />
        <Route path="/produtos-comprados" element={<ProdutosComprados />} />
        <Route path="/produtos-estoque" element={<ProdutosEstoque />} />
        <Route path="/contas-pagamentos" element={<ContasPagamentos />} />
        <Route path="/parcelas-pagar" element={<ParcelasPagar />} />
        <Route path="/galeria" element={<Galeria />} />
      </Routes>
    </Router>
  );
};

export default App;