import React from 'react'
import './NavbarFornecedores.css'
import logo from '../../../assets/logo.png'


const NavbarFornecedores = () => {

  return (
    <nav className={'container'}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>Fornecedores</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default NavbarFornecedores