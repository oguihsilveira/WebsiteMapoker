import React from 'react'
import NavbarPagamentos from './NavbarPagamentos/NavbarPagamentos'
import ContentPagamentos from './ContentPagamentos/ContentPagamentos'
import RodapePagamentos from './RodapePagamentos/RodapePagamentos'

const Pagamentos = () => {
  return (
    <div>
      <NavbarPagamentos/>
      <ContentPagamentos/>
      <div className='container'>
      <RodapePagamentos/>
      </div>
    </div>
  )
}

export default Pagamentos