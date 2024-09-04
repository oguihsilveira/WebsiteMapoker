import React from 'react'
import './Contato.css'
import msg_icon from '../../../assets/msg-icon.png'
import mail_icon from '../../../assets/mail-icon.png'
import phone_icon from '../../../assets/phone-icon.png'
import location_icon from '../../../assets/location-icon.png'
import white_arrow from '../../../assets/white-arrow.png'

const Contato = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Enviando....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "7d9b4928-5635-47ba-9a77-1b6e8fe7f5b6"); //7d9b4928-5635-47ba-9a77-1b6e8fe7f5b6 detgui95@gmail.com
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Enviado com sucesso");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };
  return (
    <div className="contato">
        <div className="contato-col">
            <h3>Envie-nos uma mensagem  <img src={msg_icon} alt="" /></h3>
            <p>Sinta-se à vontade para nos contatar através do formulário ou pelas informações abaixo. Seu Feedback, perguntas e sugestões são muito importantes para melhorarmos nosso serviço!</p>
            <ul>
                <li><img src={mail_icon} alt="" />financeiro@mapoker.com.br</li>
                <li><img src={phone_icon} alt="" />(48)99650-8500</li>
                <li><img src={location_icon} alt="" />R. Porto Alegre, 39 - Brasília, Criciúma - SC, 88813-200</li>
            </ul>
        </div>
        <div className="contato-col">
            <form onSubmit={onSubmit}>
                <label>Seu nome</label>
                <input type="text" name='nome' placeholder='Coloque seu nome' required/>
                <label>Seu número de telefone</label>
                <input type="tel" name='telefone' placeholder='Coloque seu telefone' required/>
                <label>Escreva suas mensagens aqui</label>
                <textarea name="mensagem" rows="6" placeholder='Coloque sua mensagem'></textarea>
                <button type='submit' className='btn dark-btn'>Enviar <img src={white_arrow} alt="" /></button>
            </form>
            <span>{result}</span>
        </div>
    </div>
  )
}

export default Contato