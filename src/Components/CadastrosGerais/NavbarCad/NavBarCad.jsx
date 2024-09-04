import React from 'react'
import './NavbarCad.css'
import logo from '../../../assets/logo.png'


const App = () => {

  return (
    <nav className={'container'}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>financeiro@mapoker.com.br</li>
            <li>© 2024 Mapoker. Todos os direitos reservados.</li>
            <li><button className='btn'>LogOut</button></li>
        </ul>
    </nav>
  )
}

export default App