import React from 'react'
import NavbarFuncionarios from './NavbarFuncionarios/NavbarFuncionarios'
import ContentFuncionarios from './ContentFuncionarios/ContentFuncionarios'
import RodapeFuncionarios from './RodapeFuncionarios/RodapeFuncionarios'

const Funcionarios = () => {
  return (
    <div>
      <NavbarFuncionarios/>
      <ContentFuncionarios/>
      <div className='container'>
      <RodapeFuncionarios/>
      </div>
    </div>
  )
}

export default Funcionarios