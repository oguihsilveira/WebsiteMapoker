import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ContentLoginCliente.css";

const ContentLoginCliente = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ login: "", senha: "" });
  const [cadastroData, setCadastroData] = useState({
    nome: "",
    empresa: "",
    telefone: "",
    email: "",
    login: "",
    senha: "",
  });
  const [result, setResult] = useState(""); // Para exibir resultados de login/cadastro
  const navigate = useNavigate();

  // Função para alternar entre as abas
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setResult(""); // Limpar mensagem ao mudar de aba
  };

  // Função para manipular as mudanças nos campos de input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (activeTab === "login") {
      setLoginData((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setCadastroData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // Função para fazer login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setResult("Logando...."); // Mensagem de loading

    try {
      const response = await axios.post("http://localhost:3000/login-clientes", loginData);
      const { token } = response.data;

      localStorage.setItem("token", token);
      setResult("Login bem-sucedido"); // Mensagem de sucesso
      navigate("/produtos-loja");
    } catch (error) {
      if (error.response) {
        setResult(error.response.data.error || "Erro no login");
      } else {
        setResult("Erro ao conectar ao servidor");
      }
    }
  };

  // Função para fazer cadastro
  const handleCadastroSubmit = async (e) => {
    e.preventDefault();
    try {
      const cadastroResponse = await axios.post("http://localhost:3000/clientes", cadastroData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Cadastro efetuado com sucesso!');

      // Login automático após cadastro
      const loginResponse = await axios.post("http://localhost:3000/login-clientes", {
        login: cadastroData.login,
        senha: cadastroData.senha,
      });

      const { token } = loginResponse.data;
      localStorage.setItem("token", token);
      navigate("/produtos-loja");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Erro: O login já está em uso. Por favor, escolha outro.');
      } else {
        console.error("Erro ao fazer cadastro:", error.response ? error.response.data : error.message);
        alert('Erro ao efetuar cadastro.');
      }
    }
  };

  return (
    <div className="content-login-cliente">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => handleTabClick("login")}
        >
          Login
        </button>
        <button
          className={`tab ${activeTab === "cadastro" ? "active" : ""}`}
          onClick={() => handleTabClick("cadastro")}
        >
          Cadastro
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "login" && (
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Login:</label>
                <input
                  type="text"
                  name="login"
                  className="form-input"
                  value={loginData.login}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Senha:</label>
                <input
                  type="password"
                  name="senha"
                  className="form-input"
                  value={loginData.senha}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="form-button">
                Entrar
              </button>
              <span className="result-message">{result}</span> {/* Exibe mensagem de resultado */}
            </form>
          </div>
        )}

        {activeTab === "cadastro" && (
          <div className="cadastro-form">
            <h2>Cadastro</h2>
            <form onSubmit={handleCadastroSubmit}>
              <div className="form-group">
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  className="form-input"
                  value={cadastroData.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Empresa:</label>
                <input
                  type="text"
                  name="empresa"
                  className="form-input"
                  value={cadastroData.empresa}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Telefone:</label>
                <input
                  type="text"
                  name="telefone"
                  className="form-input"
                  value={cadastroData.telefone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={cadastroData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Login:</label>
                <input
                  type="text"
                  name="login"
                  className="form-input"
                  value={cadastroData.login}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Senha:</label>
                <input
                  type="password"
                  name="senha"
                  className="form-input"
                  value={cadastroData.senha}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="form-button">
                Cadastrar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentLoginCliente;