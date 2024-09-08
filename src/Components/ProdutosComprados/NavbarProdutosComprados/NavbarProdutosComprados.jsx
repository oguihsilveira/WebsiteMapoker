import React from 'react'
import './NavbarProdutosComprados.css'
import logo from '../../../assets/logo.png'


const NavbarProdutosComprados = () => {

  return (
    <nav className={'container'}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>Produtos Comprados</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default NavbarProdutosComprados