import React, { useEffect } from 'react'
import NavbarProdutoEspecifico from './NavbarProdutoEspecifico/NavbarProdutoEspecifico'
import ContentProdutoEspecifico from './ContentProdutoEspecifico/ContentProdutoEspecifico'
import RodapeProdutoEspecifico from './RodapeProdutoEspecifico/RodapeProdutoEspecifico'

const ProdutoEspecifico = () => {
    useEffect(() => {
        // Faz scroll para o topo da página sempre que o componente é montado
        window.scrollTo(0, 0);
      }, []);

  return (
    <div>
      {/* <NavbarProdutoEspecifico/> */}
      <ContentProdutoEspecifico/>
      <div className='container'>
      {/* <RodapeProdutoEspecifico/> */}
      </div>
    </div>
  )
}

export default ProdutoEspecifico