import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Certifique-se de instalar 'jwt-decode'
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
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // Remove o token ao carregar o componente
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setResult("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (activeTab === "login") {
      setLoginData((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setCadastroData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setResult("Logando....");

    try {
      const response = await axios.post("http://localhost:3000/login-clientes", loginData);
      const { token } = response.data;

      const decodedToken = jwtDecode(token);
      console.log("Token decodificado:", decodedToken);

      localStorage.setItem("token", token);

      if (decodedToken.role === "cliente") {
        setResult("Login bem-sucedido");
        navigate("/produtos-loja");
      } else {
        setResult("Acesso negado: você não tem permissão para acessar esta área.");
      }
    } catch (error) {
      console.error("Erro durante o login:", error.response || error.message);
      if (error.response) {
        setResult(`Erro: ${error.response.status} - ${error.response.data.error || "Erro no login"}`);
      } else {
        setResult(`Erro ao conectar: ${error.message}`);
      }
    }
  };

  const handleCadastroSubmit = async (e) => {
    e.preventDefault();
    console.log("Tentativa de cadastro iniciada:", cadastroData);

    try {
      const cadastroResponse = await axios.post("http://localhost:3000/clientes", cadastroData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Cadastro efetuado:", cadastroResponse.data);
      alert("Cadastro efetuado com sucesso!");

      const loginResponse = await axios.post("http://localhost:3000/login-clientes", {
        login: cadastroData.login,
        senha: cadastroData.senha,
      });

      const { token } = loginResponse.data;
      console.log("Login automático após cadastro bem-sucedido. Token:", token);
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      console.log("Token decodificado após cadastro:", decodedToken);

      if (decodedToken.role === "cliente") {
        navigate("/produtos-loja");
      } else {
        alert("Houve um problema em relação ao acesso à Loja.");
        navigate("/login-clientes");
      }
    } catch (error) {
      console.error("Erro durante o cadastro:", error.response || error.message);
      if (error.response && error.response.status === 409) {
        alert("Erro: O login já está em uso. Por favor, escolha outro.");
      } else {
        alert("Erro ao efetuar Login.");
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
              <span className="result-message">{result}</span>
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