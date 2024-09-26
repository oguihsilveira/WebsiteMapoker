import React from 'react'
import NavbarUsuarios from './NavbarUsuarios/NavbarUsuarios'
import ContentUsuarios from './ContentUsuarios/ContentUsuarios'
import RodapeUsuarios from './RodapeUsuarios/RodapeUsuarios'

const Usuarios = () => {
  return (
    <div>
      <NavbarUsuarios/>
      <ContentUsuarios/>
      <div className='container'>
      <RodapeUsuarios/>
      </div>
    </div>
  )
}

export default Usuarios