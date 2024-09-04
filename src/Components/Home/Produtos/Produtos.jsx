import React from 'react'
import './Produtos.css'
import rolamento from '../../../assets/rolamento.jpg'
import rebolo from '../../../assets/rebolo.jpg'
import correia from '../../../assets/correia.jpg'

import rolamento_icon from '../../../assets/rolamento-icon.png'
import rebolo_icon from '../../../assets/rebolo-icon.png'
import correia_icon from '../../../assets/correia-icon.png'

const Produtos = () => {
  return (
    <div className='produtos'>
        <div className='produto'>
            <img src={rolamento} alt="" />
            <div className='caption'>
                <img src={rolamento_icon} alt="" />
                <p>Rolamentos</p>
            </div>
        </div>
        <div className='produto'>
            <img src={rebolo} alt="" />
            <div className='caption'>
                <img src={rebolo_icon} alt="" />
                <p>Rebolos</p>
            </div>
        </div>
        <div className='produto'>
            <img src={correia} alt="" />
            <div className='caption'>
                <img src={correia_icon} alt="" />
                <p>Correias</p>
            </div>
        </div>
    </div>
  )
}

export default Produtos