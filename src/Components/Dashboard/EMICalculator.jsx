import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTenure, setLoanTenure] = useState(12); 
  const [emi, setEmi] = useState(0);
  const [amortizationData, setAmortizationData] = useState([]);

  // EMI Calculation  Work
  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const interestRateMonthly = parseFloat(interestRate) / 12 / 100;
    const months = parseFloat(loanTenure);

    // EMI formula this 
    const emi = (principal * interestRateMonthly * Math.pow(1 + interestRateMonthly, months)) / (Math.pow(1 + interestRateMonthly, months) - 1);
    setEmi(emi.toFixed(2));

    // Amortization Chart data
    const amortization = [];
    let remainingPrincipal = principal;
    for (let i = 1; i <= months; i++) {
      const interest = remainingPrincipal * interestRateMonthly;
      const principalPaid = emi - interest;
      remainingPrincipal -= principalPaid;

      amortization.push({
        month: i,
        principalPaid: principalPaid.toFixed(2),
        interestPaid: interest.toFixed(2),
      });
    }
    setAmortizationData(amortization);
  };

  // Chart Data Preparation
  const chartData = {
    labels: amortizationData.map((data) => `Month ${data.month}`),
    datasets: [
      {
        label: 'Principal Paid',
        data: amortizationData.map((data) => data.principalPaid),
        fill: false,
        borderColor: 'green',
        tension: 0.2,
        pointRadius: 5, 
        pointBackgroundColor: 'green', 
        borderCapStyle: 'round', 
        borderJoinStyle: 'round', 
      },
      {
        label: 'Interest Paid',
        data: amortizationData.map((data) => data.interestPaid),
        fill: false,
        borderColor: 'red',
        tension: 0.2, 
        pointRadius: 2, 
        pointBackgroundColor: 'red', 
        borderCapStyle: 'round', 
        borderJoinStyle: 'round',
      },
    ],
  };

  return (
    <div className=" mx-auto p-3 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">EMI Calculator</h1>

      {/* Loan Details Form */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter loan amount"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter interest rate"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Loan Tenure (Months)</label>
        <input
          type="number"
          value={loanTenure}
          onChange={(e) => setLoanTenure(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter loan tenure"
        />
      </div>

      <button
        onClick={calculateEMI}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Calculate EMI
      </button>

      <div className="mt-1 text-center">
        <h2 className="text-xl font-semibold">Your EMI: ₹{emi}</h2>
      </div>
            {/* Show Chart */}
      {amortizationData.length > 0 && (
        
        <div className="w-[65%]">
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default EMICalculator;
