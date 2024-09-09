import React from 'react'
import './Hero.css'
import dark_arrow from '../../../assets/dark-arrow.png'
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <div className='hero container'>
        <div className='hero-text'>
            <h1>Mapoker</h1>
            <p>Soluções para indústria!</p>
            <Link to='login' smooth={true} offset={-240} duration={500}><button className='btn'>  Explore mais <img src={dark_arrow} alt=""/></button></Link>
        </div>
    </div>
  )
}

export default Hero