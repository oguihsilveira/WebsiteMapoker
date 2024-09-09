import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';
import Title from './Title/Title';
import Produtos from './Produtos/Produtos';
import Sobre from './Sobre/Sobre';
import Ambiente from './Ambiente/Ambiente';
import Login from './Login/Login';
import Contato from './Contato/Contato';
import Rodape from './Rodape/Rodape';

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="container">
        <Title subTitle="Nossos produtos" title="O que vendemos" />
        <Produtos />
        <Sobre />
        <Title subTitle="Galeria" title="Ambiente da empresa" />
        <Ambiente />
        <Title subTitle="ERP" title="Fazer Login" />
        <Login />
        <Title subTitle="Contate-nos" title="Fique à vontade" />
        <Contato />
        <Rodape />
      </div>
    </div>
  );
}

export default Home