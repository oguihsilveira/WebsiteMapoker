import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para navegação
import './BtnCadGerais.css'; // Importar o CSS

const BtnCadGerais = () => {
  const navigate = useNavigate(); // Instanciar o useNavigate

  return (
    <div className="btn-container">
      <button className="btncadgerais" onClick={() => navigate('/funcionarios')}>
        Funcionários
      </button> {/* Funcionarios */}

      <button className="btncadgerais" onClick={() => navigate('/usuarios-erp')}>
        Usuários do Sistema
      </button> {/* Usuários que podem logar dentro do ERP */}

      <button className="btncadgerais" onClick={() => navigate('/estoque')}>
        Estoque da Empresa
      </button> {/* Produtos que no estoque da empresa */}

      <button className="btncadgerais" onClick={() => navigate('/clientes')}>
        Clientes
      </button> {/* Clientes que fizeram cadastro no site */}

      <button className="btncadgerais" onClick={() => navigate('/pedidos')}>
        Pedidos
      </button> {/* Produtos que foram pedidos por clientes */}

      <button className="btncadgerais" onClick={() => navigate('/contas-pagamentos')}>
        Contas & Pagamentos
      </button> {/* Contas/Pagamentos dos produtos comprados dos fornecedores */}

      <button className="btncadgerais" onClick={() => navigate('/parcelas-pagar')}>
        Parcelas a Pagar
      </button> {/* Caso o tipo de pagamento for Parcelado/Financiado, mostrar parcelas que restam a pagar. */}
    </div>
  );
}

export default BtnCadGerais;