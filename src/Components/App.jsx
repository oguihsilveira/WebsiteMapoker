import React from 'react'
import Navbar from './Navbar/Navbar'
import Hero from './Hero/Hero'
import Programs from './Programs/Programs'
import Title from './Title/Title'


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