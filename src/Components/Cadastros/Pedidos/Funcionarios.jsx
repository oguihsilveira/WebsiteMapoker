import React from 'react'
import NavbarPedidos from './NavbarPedidos/NavbarPedidos'
import ContentPedidos from './ContentPedidos/ContentPedidos'
import RodapePedidos from './RodapePedidos/RodapePedidos'

const Pedidos = () => {
  return (
    <div>
      <NavbarPedidos/>
      <ContentPedidos/>
      <div className='container'>
      <RodapePedidos/>
      </div>
    </div>
  )
}

export default Pedidos