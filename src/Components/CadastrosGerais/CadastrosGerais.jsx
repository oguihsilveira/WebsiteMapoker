import React, { useEffect } from 'react';
import NavbarCadGerais from './NavbarCadGerais/NavBarCadGerais';
import RodapeCadGerais from './RodapeCadGerais/RodapeCadGerais';
import BtnCadGerais from './BtnCadGerais/BtnCadGerais';

const CadastrosGerais = () => {
  useEffect(() => {
    // Faz scroll para o topo da página sempre que o componente é montado
    window.scrollTo(0, 0);
  }, []);

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