import React from 'react'
import Navbar from '../src/Components/Navbar/Navbar'
import Hero from '../src/Components/Hero/Hero'
import Programs from '../src/Components/Programs/Programs'
import Title from '../src/Components/Title/Title'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className='container'>
        <Title subTitle='Our Program' title='What we offer'/>
        <Programs/>
      </div>
      
    </div>
  )
}

export default App