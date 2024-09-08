import React from 'react'
import './NavbarCadGerais.css'
import logo from '../../../assets/logo.png'


const NavbarCadGerais = () => {

  return (
    <nav className={'container'}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>financeiro@mapoker.com.br</li>
            <li>Gestão ERP</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default NavbarCadGerais