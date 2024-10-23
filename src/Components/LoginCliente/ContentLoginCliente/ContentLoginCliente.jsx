import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ContentLoginCliente.css";

const ContentLoginCliente = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [cadastroData, setCadastroData] = useState({ nome: "", empresa: "", login: "", password: "" });
  const navigate = useNavigate();

  // Função para alternar entre as abas
  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
    try {
      const response = await axios.post("/login_clientes", loginData);
      const { token } = response.data;

      // Armazenar o token no localStorage
      localStorage.setItem("token", token);

      // Redirecionar para a página de produtos_loja
      navigate("/produtos_loja");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  // Função para fazer cadastro
  const handleCadastroSubmit = async (e) => {
    e.preventDefault();
    try {
      // Primeiro, faça o cadastro do cliente
      const cadastroResponse = await axios.post("/clientes", cadastroData);
      console.log("Cadastro realizado:", cadastroResponse.data);

      // Em seguida, faça login automaticamente para obter o token
      const loginResponse = await axios.post("/login_clientes", {
        login: cadastroData.login,
        password: cadastroData.password,
      });

      const { token } = loginResponse.data;

      // Armazenar o token no localStorage
      localStorage.setItem("token", token);

      // Redirecionar para a página de produtos_loja
      navigate("/produtos_loja");
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
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
                  name="password"
                  className="form-input"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="form-button">Entrar</button>
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
                <label>Empresa (Opcional):</label>
                <input
                  type="text"
                  name="empresa"
                  className="form-input"
                  value={cadastroData.empresa}
                  onChange={handleInputChange}
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
                  name="password"
                  className="form-input"
                  value={cadastroData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="form-button">Cadastrar</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentLoginCliente;