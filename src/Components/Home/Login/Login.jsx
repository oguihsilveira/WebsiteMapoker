import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios'; // Importar axios
import './Login.css';
import white_arrow from '../../../assets/white-arrow.png';

const Login = () => {
  const [result, setResult] = useState("");
  const navigate = useNavigate(); // Instanciar useNavigate

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Logando....");
    const formData = new FormData(event.target);

    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await axios.post('http://localhost:3000/login-usuarios', {
        login: username,
        senha: password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token); // Armazenar o token
        setResult("Login bem-sucedido");
        navigate('/cadastros-gerais'); // Redirecionar após login
      }
    } catch (error) {
      if (error.response) {
        setResult(error.response.data.error || "Erro no login");
      } else {
        setResult("Erro ao conectar ao servidor");
      }
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