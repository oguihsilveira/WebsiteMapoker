import React, { useState } from 'react'
import './Sobre.css'
import about_img from '../../../assets/about.png'
import play_icon from '../../../assets/play-icon.png'

const Sobre = () => {
  // Estado para controlar a exibição do modal de vídeo
  const [showVideo, setShowVideo] = useState(false);

  // Função para abrir o modal
  const handlePlayClick = () => {
    setShowVideo(true);
  };

  // Função para fechar o modal
  const handleClose = () => {
    setShowVideo(false);
  };

  return (
    <div className='sobre'>
      <div className='sobre-left'>
        <img src={about_img} alt="Sobre a empresa" className='sobre-img' />
        <img src={play_icon} alt="Ícone de Play" className='play-icon' onClick={handlePlayClick} />
      </div>
      <div className='sobre-right'>
        <div className='header-group'>
          <h3>Sobre nós</h3>
          <h2>Curiosidades</h2>
        </div>
          <p>Fundada em [Ano de Fundação], nossa empresa nasceu do desejo de inovar e oferecer soluções tecnológicas que facilitam a vida das pessoas e das organizações. Com um forte compromisso com a qualidade e a inovação, estamos presentes no mercado desde [Ano], sempre buscando maneiras de agregar valor aos nossos clientes e parceiros.
          </p>
          <p>Os fundadores, [Nomes dos Donos], são profissionais experientes no setor de [Setor da Empresa], trazendo uma combinação única de expertise técnica e visão estratégica. A paixão por tecnologia e a vontade de fazer a diferença no mercado foram os pilares que sustentaram a criação da empresa, que hoje é referência em [Área de Atuação].
          </p>
          <p>No mercado, buscamos constantemente nos destacar pela excelência em nossos serviços e produtos. Nosso objetivo é não apenas atender às expectativas dos nossos clientes, mas superá-las, entregando soluções personalizadas e inovadoras. Estamos comprometidos com o crescimento sustentável, a ética nos negócios e a construção de relacionamentos duradouros que gerem benefícios mútuos.
          </p>
      </div>

      {/* Modal para exibir o vídeo */}
      {showVideo && (
        <div className='video-modal'>
          <div className='video-container'>
            <span className='close-btn' onClick={handleClose}>&times;</span>
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Vídeo de Apresentação"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sobre
