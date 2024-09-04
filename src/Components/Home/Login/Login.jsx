import React, { useState } from 'react';
import './Login.css';
import white_arrow from '../../../assets/white-arrow.png';

const Login = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Logando....");
    const formData = new FormData(event.target);

    // Aqui, você pode implementar a lógica de login real
    const username = formData.get('username');
    const password = formData.get('password');

    if (username === 'admin' && password === '1234') {
      setResult("Login bem-sucedido");
      // Redirecionar para outra página, se necessário
      window.location.href = "/CadastrosGerais";
    } else {
      setResult("Credenciais incorretas");
    }
  };

  return (
    <div className="login">
      <form onSubmit={onSubmit}>
        <label>Usuário</label>
        <input type="text" name="username" placeholder="Coloque seu usuário" required />
        <label>Senha</label>
        <input type="password" name="password" placeholder="Coloque sua senha" required />
        <button type="submit" className="btn dark-btn">Entrar <img src={white_arrow} alt="Arrow Icon" /></button>
        <span>{result}</span>
      </form>
    </div>
  );
};

export default Login;