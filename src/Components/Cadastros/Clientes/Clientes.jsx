import React from 'react'
import NavbarClientes from './NavbarClientes/NavbarClientes'
import ContentClientes from './ContentClientes/ContentClientes'
import RodapeClientes from './RodapeClientes/RodapeClientes'

const Clientes = () => {
  return (
    <div>
      <NavbarClientes/>
      <ContentClientes/>
      <div className='container'>
      <RodapeClientes/>
      </div>
    </div>
  )
}

export default Clientes