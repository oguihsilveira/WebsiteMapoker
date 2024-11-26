import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './ContentRelatorio.css'; // Adicionando a folha de estilo

const ContentRelatorio = () => {
  const [relatorioData, setRelatorioData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/relatorio/gastos') // Endpoint completo
      .then(response => {
        console.log('Dados do relatório:', response.data);
        setRelatorioData(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar o relatório:', error);
      });
  }, []);  

  // Verificando se os dados já foram carregados
  if (!relatorioData) {
    return <div>Carregando...</div>;
  }

  // Garantindo que os dados recebidos da API estão na forma correta
  const data = {
    labels: ['Estoque', 'Pedidos'], // Labels para o gráfico
    datasets: [
      {
        label: 'Gastos de Estoque',
        data: [relatorioData.gasto_estoque, 0], // Gastos de estoque
        backgroundColor: 'rgba(255, 87, 34, 0.7)', // Laranja escuro
        borderColor: 'rgba(255, 87, 34, 1)', // Bordas laranja escuro
        borderWidth: 1,
      },
      {
        label: 'Total em Pedidos',
        data: [0, relatorioData.gasto_pedidos], // Gastos de pedidos
        backgroundColor: 'rgba(255, 152, 72, 0.7)', // Laranja claro
        borderColor: 'rgba(255, 152, 72, 1)', // Bordas laranja claro
        borderWidth: 1,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Relatório Financeiro',
      },
    },
  };

  return (
    <div className="relatorio-container">
      <h2>Relatório Financeiro</h2>
      <div className="grafico-container">
        <Bar data={data} options={options} /> {/* Exibindo o gráfico */}
      </div>
    </div>
  );
};

export default ContentRelatorio;
