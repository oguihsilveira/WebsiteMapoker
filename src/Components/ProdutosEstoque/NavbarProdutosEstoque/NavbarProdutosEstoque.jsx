import React from 'react'
import './NavbarProdutosEstoque.css'
import logo from '../../../assets/logo.png'


const NavbarProdutosEstoque = () => {

  return (
    <nav className={'container'}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>Produtos em Estoque</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default NavbarProdutosEstoque