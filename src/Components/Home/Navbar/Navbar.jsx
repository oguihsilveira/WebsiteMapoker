import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../../assets/logo.png'
import { Link } from 'react-scroll'

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
            <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
            <li><Link to='produtos' smooth={true} offset={-260} duration={500}>Produtos</Link></li>
            <li><Link to='sobre' smooth={true} offset={-150} duration={500}>Sobre nós</Link></li>
            <li><Link to='ambiente' smooth={true} offset={-260} duration={500}>Ambiente</Link></li>
            <li><Link to='login' smooth={true} offset={-240} duration={500}>Gestão ERP</Link></li>
            <li><Link to='contato' smooth={true} offset={-260} duration={500}><button className='btn'>Nos contate</button></Link></li>
        </ul>
    </nav>
  )
}

export default App