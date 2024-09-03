import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'


const App = () => {

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () =>{
      window.scrollY > 50 ?setSticky(true) : setSticky(false);
    })
  }, []);

  return (
    <nav className={`container ${sticky? 'dark-nav' : ''}`}>
        <img src={logo} alt="" className='logo'/>
        <ul>
            <li>Home</li>
            <li>Produtos</li>
            <li>Sobre nós</li>
            <li>Ambiente</li>
            <li>Gestão ERP</li>
            <li><button className='btn'>Nos contate</button></li>
        </ul>
    </nav>
  )
}

export default App