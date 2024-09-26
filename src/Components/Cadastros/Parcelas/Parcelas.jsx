import React from 'react'
import NavbarParcelas from './NavbarParcelas/NavbarParcelas'
import ContentParcelas from './ContentParcelas/ContentParcelas'
import RodapeParcelas from './RodapeParcelas/RodapeParcelas'

const Parcelas = () => {
  return (
    <div>
      <NavbarParcelas/>
      <ContentParcelas/>
      <div className='container'>
      <RodapeParcelas/>
      </div>
    </div>
  )
}

export default Parcelas