import React, { useEffect } from 'react'
import NavbarProdutosLoja from './NavbarProdutosLoja/NavbarProdutosLoja'
import ContentProdutosLoja from './ContentProdutosLoja/ContentProdutosLoja'
import RodapeProdutosLoja from './RodapeProdutosLoja/RodapeProdutosLoja'

const ProdutosLoja = () => {
    useEffect(() => {
        // Faz scroll para o topo da página sempre que o componente é montado
        window.scrollTo(0, 0);
      }, []);

  return (
    <div>
      <NavbarProdutosLoja/>
      <ContentProdutosLoja/>
      <div className='container'>
      <RodapeProdutosLoja/>
      </div>
    </div>
  )
}

export default ProdutosLoja