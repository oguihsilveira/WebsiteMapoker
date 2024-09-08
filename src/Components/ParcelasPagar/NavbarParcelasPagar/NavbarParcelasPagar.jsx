import React from 'react'
import './NavbarParcelasPagar.css'
import logo from '../../../assets/logo.png'


const NavbarParcelasPagar = () => {

  return (
    <nav className={'container'}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>Parcelas a Pagar</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default NavbarParcelasPagar