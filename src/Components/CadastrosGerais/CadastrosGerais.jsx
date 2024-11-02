import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Certifique-se de instalar jwt-decode se ainda não o fez
import NavbarCadGerais from './NavbarCadGerais/NavBarCadGerais';
import RodapeCadGerais from './RodapeCadGerais/RodapeCadGerais';
import BtnCadGerais from './BtnCadGerais/BtnCadGerais';

const CadastrosGerais = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o token está presente e se ele é válido
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Tempo atual em segundos

        // Verifica se o token expirou
        if (decodedToken.exp < currentTime) {
          // Se o token expirou, remove-o e redireciona para a home
          localStorage.removeItem('token');
          navigate('/'); // Redireciona para a home
        }
      } catch (error) {
        console.error('Token inválido:', error);
        localStorage.removeItem('token');
        navigate('/'); // Redireciona para a home em caso de erro na decodificação
      }
    } else {
      navigate('/'); // Redireciona para a home se não houver token
    }

    // Faz scroll para o topo da página sempre que o componente é montado
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div>
      <NavbarCadGerais />
      <div className='container'>
        <BtnCadGerais />
        <RodapeCadGerais />
      </div>
    </div>
  );
}

export default CadastrosGerais;
