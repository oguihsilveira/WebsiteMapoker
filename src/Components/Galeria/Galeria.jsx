import React from 'react'
import NavbarGaleria from './NavbarGaleria/NavbarGaleria'
import Title from '../Home/Title/Title'
import ContentGaleria from './ContentGaleria/ContentGaleria'
import RodapeGaleria from './RodapeGaleria/RodapeGaleria'

const Galeria = () => {
  return (
    <div>
      <NavbarGaleria/>
      <br /><br /><br />
      <div className='container'>
      <Title subTitle="Galeria" title="Ambiente da Empresa" />
      <ContentGaleria/>
      <RodapeGaleria/>
      </div>
    </div>
  )
}

export default Galeria