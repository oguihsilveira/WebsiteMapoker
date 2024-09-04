import React from 'react'
import './Sobre.css'
import about_img from '../../../assets/about.png'
import play_icon from '../../../assets/play-icon.png'


const Sobre = () => {
  return (
    <div className='sobre'>
        <div className='sobre-left'>
            <img src={about_img} alt="" className='sobre-img'/>
            <img src={play_icon} alt="" className='play-icon'/>
        </div>
        <div className='sobre-right'>
            <h3>Sobre nós</h3>
            <h2>Curiosidades</h2>
            <p>Fundada em [Ano de Fundação], nossa empresa nasceu do desejo de inovar e oferecer soluções tecnológicas que facilitam a vida das pessoas e das organizações. Com um forte compromisso com a qualidade e a inovação, estamos presentes no mercado desde [Ano], sempre buscando maneiras de agregar valor aos nossos clientes e parceiros.</p>
            <p>Os fundadores, [Nomes dos Donos], são profissionais experientes no setor de [Setor da Empresa], trazendo uma combinação única de expertise técnica e visão estratégica. A paixão por tecnologia e a vontade de fazer a diferença no mercado foram os pilares que sustentaram a criação da empresa, que hoje é referência em [Área de Atuação].</p>
            <p>No mercado, buscamos constantemente nos destacar pela excelência em nossos serviços e produtos. Nosso objetivo é não apenas atender às expectativas dos nossos clientes, mas superá-las, entregando soluções personalizadas e inovadoras. Estamos comprometidos com o crescimento sustentável, a ética nos negócios e a construção de relacionamentos duradouros que gerem benefícios mútuos.

</p>
        </div>
    </div>
  )
}

export default Sobre