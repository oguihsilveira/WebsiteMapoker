// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Alterado para importação de nome

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');

  // Se não houver token, redireciona para a página inicial
  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    // Decodifica o token para verificar as informações do usuário
    const decodedToken = jwtDecode(token); // Mantém a mesma lógica
    const userRole = decodedToken.role;

    // Verifica se a role do usuário está na lista de roles permitidas
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/" />; // Redireciona se a role não for permitida
    }
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return <Navigate to="/" />; // Redireciona se houver erro ao decodificar
  }

  // Se houver token e a role for permitida, permite o acesso à rota
  return children;
};

export default PrivateRoute;
