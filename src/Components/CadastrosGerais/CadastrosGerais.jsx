import React from 'react';
import NavbarCadGerais from './NavbarCadGerais/NavBarCadGerais';
import RodapeCadGerais from './RodapeCadGerais/RodapeCadGerais';
import BtnCadGerais from './BtnCadGerais/BtnCadGerais';

const CadastrosGerais = () => {
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