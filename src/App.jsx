import React from 'react'
import Navbar from '../src/Components/Navbar/Navbar'
import Hero from '../src/Components/Hero/Hero'
import Programs from '../src/Components/Programs/Programs'
import Title from '../src/Components/Title/Title'
import About from '../src/Components/About/About'
import Campus from '../src/Components/Campus/Campus'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className='container'>
        <Title subTitle='Our Program' title='What we offer'/>
        <Programs/>
        <About/>
        <Title subTitle='Gallery' title='Campus Photos'/>
        <Campus/>
      </div>
      
    </div>
  )
}

export default App