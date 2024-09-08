import React from 'react'
import './NavbarUsuarios.css'
import logo from '../../../assets/logo.png'


const NavbarUsuarios = () => {

  return (
    <nav className={'container'}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>Usuários</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default NavbarUsuarios