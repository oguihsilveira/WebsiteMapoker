import React, { useState } from "react";
import "./ContentLoginCliente.css";

const ContentLoginCliente = () => {
  // Estado para controlar qual aba está ativa
  const [activeTab, setActiveTab] = useState("login");

  // Função para alternar entre as abas
  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
            <form>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" className="form-input" required />
              </div>
              <div className="form-group">
                <label>Senha:</label>
                <input type="password" name="password" className="form-input" required />
              </div>
              <button type="submit" className="form-button">Entrar</button>
            </form>
          </div>
        )}

        {activeTab === "cadastro" && (
          <div className="cadastro-form">
            <h2>Cadastro</h2>
            <form>
              <div className="form-group">
                <label>Nome:</label>
                <input type="text" name="nome" className="form-input" required />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" className="form-input" required />
              </div>
              <div className="form-group">
                <label>Senha:</label>
                <input type="password" name="password" className="form-input" required />
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