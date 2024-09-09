import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para navegação
import './BtnCadGerais.css'; // Importar o CSS

const BtnCadGerais = () => {
  const navigate = useNavigate(); // Instanciar o useNavigate

  return (
    <div className="btn-container">
      <button className="btncadgerais" onClick={() => navigate('/funcionarios')}>
        Funcionarios
      </button> {/* Funcionarios */}

      <button className="btncadgerais" onClick={() => navigate('/fornecedores')}>
        Fornecedores
      </button> {/* Fornecedores */}

      <button className="btncadgerais" onClick={() => navigate('/usuarios-erp')}>
        Usuários ERP
      </button> {/* Usuários que podem logar dentro do ERP */}

      <button className="btncadgerais" onClick={() => navigate('/produtos-fornecedores')}>
        Produtos dos Fornecedores
      </button> {/* Produtos que os fornecedores colocam para a empresa comprar */}

      <button className="btncadgerais" onClick={() => navigate('/produtos-comprados')}>
        Produtos Comprados
      </button> {/* Produtos que foram comprados dos fornecedores */}

      <button className="btncadgerais" onClick={() => navigate('/produtos-estoque')}>
        Produtos em Estoque
      </button> {/* Produtos que foram comprados e CHEGARAM ao estoque da empresa */}

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