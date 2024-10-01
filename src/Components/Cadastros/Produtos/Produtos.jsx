import React from 'react'
import NavbarProdutos from './NavbarProdutos/NavbarProdutos'
import ContentProdutos from './ContentProdutos/ContentProdutos'
import RodapeProdutos from './RodapeProdutos/RodapeProdutos'

const Produtos = () => {
  return (
    <div>
      <NavbarProdutos/>
      <ContentProdutos/>
      <div className='container'>
      <RodapeProdutos/>
      </div>
    </div>
  )
}

export default Produtos