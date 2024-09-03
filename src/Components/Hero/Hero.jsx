import React from 'react'
import './Hero.css'
import dark_arrow from '../../assets/dark-arrow.png'

const Hero = () => {
  return (
    <div className='hero container'>
        <div className='hero-text'>
            <h1>Titulo</h1>
            <p>paragrafo aqui wfb3fuhwoifoewuhwoufieuedhudhuehduehuhudhuhudhuheufurhfuhfdufhiufhiufhd</p>
            <button className='btn'>Explore mais <img src={dark_arrow} alt=""/></button>
        </div>
    </div>
  )
}

export default Hero