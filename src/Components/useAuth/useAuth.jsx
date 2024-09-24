import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // Note que agora está com underline

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwt_decode(token); // Decodifica o token
        const currentTime = Date.now() / 1000; // Tempo atual em segundos

        if (decoded.exp < currentTime) {
          localStorage.removeItem('token'); // Remove o token expirado
          navigate('/'); // Redireciona para a página inicial
        }
      } catch (error) {
        console.error('Token inválido:', error);
        localStorage.removeItem('token'); // Remove token inválido
        navigate('/'); // Redireciona para a página inicial
      }
    } else {
      navigate('/'); // Redireciona se não houver token
    }
  }, [navigate]);
};

export default useAuth;
