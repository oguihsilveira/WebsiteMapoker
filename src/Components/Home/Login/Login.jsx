import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Login.css';
import white_arrow from '../../../assets/white-arrow.png';

const Login = () => {
  const [result, setResult] = useState("");
  const navigate = useNavigate();

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

      console.log(response.data); // Verifique a resposta do servidor

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token); // Armazenar o token

        // Decodifica o token para verificar a role usando jwtDecode
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        console.log('User Role:', userRole); // Verifique a role do usuário

        // Verifica a role do usuário e redireciona se for 'admin'
        if (userRole === 'admin') {
          setResult("Login bem-sucedido");
          console.log("Redirecionando para cadastros-gerais");
          navigate('/cadastros-gerais');
        } else {
          setResult("Acesso negado: Usuário não autorizado");
        }
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro no servidor:', error.response.data);
        setResult(error.response.data.error || "Erro no login");
      } else if (error.request) {
        setResult("Erro ao conectar ao servidor: Solicitação não recebida");
      } else {
        setResult("Erro: " + error.message);
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