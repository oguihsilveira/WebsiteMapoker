import React from 'react'
import './NavbarFuncionarios.css'
import logo from '../../../assets/logo.png'


const NavbarFuncionarios = () => {

  return (
    <nav className={'container'}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>Funcionários</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default NavbarFuncionarios