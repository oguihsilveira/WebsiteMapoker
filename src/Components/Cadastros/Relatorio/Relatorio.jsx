import React from 'react'
import NavbarRelatorio from './NavbarRelatorio/NavbarRelatorio'
import ContentRelatorio from './ContentRelatorio/ContentRelatorio'
import RodapeRelatorio from './RodapeRelatorio/RodapeRelatorio'

const Relatorio = () => {
  return (
    <div>
      <NavbarRelatorio/>
      <ContentRelatorio/>
      <div className='container'>
      <RodapeRelatorio/>
      </div>
    </div>
  )
}

export default Relatorio