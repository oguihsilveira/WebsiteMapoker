import React from 'react'
import NavbarEstoque from './NavbarEstoque/NavbarEstoque'
import ContentEstoque from './ContentEstoque/ContentEstoque'
import RodapeEstoque from './RodapeEstoque/RodapeEstoque'

const Estoque = () => {
  return (
    <div>
      <NavbarEstoque/>
      <ContentEstoque/>
      <div className='container'>
      <RodapeEstoque/>
      </div>
    </div>
  )
}

export default Estoque