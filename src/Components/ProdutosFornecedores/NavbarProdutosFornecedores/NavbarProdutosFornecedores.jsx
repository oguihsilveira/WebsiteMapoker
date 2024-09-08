import React from 'react'
import './NavbarProdutosFornecedores.css'
import logo from '../../../assets/logo.png'


const NavbarProdutosFornecedores = () => {

  return (
    <nav className={'container'}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>Produtos de Fornecedores</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default NavbarProdutosFornecedores