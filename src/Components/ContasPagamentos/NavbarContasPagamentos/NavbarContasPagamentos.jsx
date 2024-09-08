import React from 'react'
import './NavbarContasPagamentos.css'
import logo from '../../../assets/logo.png'


const NavbarContasPagamentos = () => {

  return (
    <nav className={'container'}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>Contas & Pagamentos</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default NavbarContasPagamentos