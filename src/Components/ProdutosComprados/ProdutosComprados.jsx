import React from 'react'
import NavbarProdutosComprados from './NavbarProdutosComprados/NavbarProdutosComprados'
import ContentProdutosComprados from './ContentProdutosComprados/ContentProdutosComprados'
import RodapeProdutosComprados from './RodapeProdutosComprados/RodapeProdutosComprados'

const ProdutosComprados = () => {
  return (
    <div>
      <NavbarProdutosComprados/>
      <ContentProdutosComprados/>
      <RodapeProdutosComprados/>
    </div>
  )
}

export default ProdutosComprados