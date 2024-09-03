import React from 'react'
//Navegação e Foto principal
import Navbar from '../src/Components/Navbar/Navbar'
import Hero from '../src/Components/Hero/Hero'
import Produtos from './Components/Produtos/Produtos'
import Title from '../src/Components/Title/Title'
import Sobre from '../src/Components/Sobre/Sobre'
import Ambiente from '../src/Components/Ambiente/Ambiente'
import Contato from '../src/Components/Contato/Contato'
import Rodape from '../src/Components/Rodape/Rodape'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className='container'>
        <Title subTitle='Nossos produtos' title='O que vendemos'/>
        <Produtos/>
        <Sobre/>
        <Title subTitle='Galeria' title='Ambiente da empresa'/>
        <Ambiente/>
        <Title subTitle='ERP' title='Fazer Login'/>
        <Title subTitle='Contate-nos' title='Fique à vontade'/>
        <Contato/>
        <Rodape/>
      </div>
      
    </div>
  )
}

export default App