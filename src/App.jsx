import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importações necessárias para o roteamento
import Home from "./Components/Home/home";
import CadastrosGerais from "./Components/CadastrosGerais/CadastrosGerais"; // Adicione a página destino

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/CadastrosGerais" element={<CadastrosGerais/>} />
      </Routes>
    </Router>
  );
};

export default App;
