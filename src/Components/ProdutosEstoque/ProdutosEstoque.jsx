import React from 'react'
import NavbarProdutosEstoque from './NavbarProdutosEstoque/NavbarProdutosEstoque'
import ContentProdutosEstoque from './ContentProdutosEstoque/ContentProdutosEstoque'
import RodapeProdutosEstoque from './RodapeProdutosEstoque/RodapeProdutosEstoque'

const ProdutosEstoque = () => {
  return (
    <div>
      <NavbarProdutosEstoque/>
      <ContentProdutosEstoque/>
      <RodapeProdutosEstoque/>
    </div>
  )
}

export default ProdutosEstoque