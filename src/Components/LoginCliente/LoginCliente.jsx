import React from 'react'
import NavbarLoginCliente from './NavbarLoginCliente/NavbarLoginCliente'
import Title from './Title/Title'
import ContentLoginCliente from './ContentLoginCliente/ContentLoginCliente'
import RodapeLoginCliente from './RodapeLoginCliente/RodapeLoginCliente'

const LoginCliente = () => {
  return (
    <div>
      <NavbarLoginCliente/>
      <br /><br /><br />
      <div className='container'>
      <Title subTitle="Bem vindo!" title="Escolha a Opção:" />
      <ContentLoginCliente/>
      <RodapeLoginCliente/>
      </div>
    </div>
  )
}

export default LoginCliente