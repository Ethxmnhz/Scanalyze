// src/components/ScoreChart.js
import React from 'react';
import { Bar, Line, Doughnut, Chart } from 'react-chartjs-2';
import './ScoreChart.css'; // Create a CSS file for styling
import { FaChartBar, FaChartLine, FaChartPie, FaSyncAlt } from 'react-icons/fa'; // Updated icon imports

// Registering the necessary chart types
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ScoreChart = ({ score }) => {
  // Sample data for the charts
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Monthly Requests',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Vulnerability Trend',
        data: [1, 2, 1, 3],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const doughnutData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        data: [30, 50, 10, 10],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
      },
    ],
  };

  const liveCount = Math.floor(Math.random() * 100); // Simulated live count

  return (
    <div className="score-chart-container">
      <div className="chart-card">
        <h3><FaChartBar /> Monthly Requests</h3>
        <Bar data={barData} />
      </div>
      <div className="chart-card">
        <h3><FaChartLine /> Vulnerability Trend</h3>
        <Line data={lineData} />
      </div>
      <div className="chart-card">
        <h3><FaChartPie /> Vulnerability Distribution</h3>
        <Doughnut data={doughnutData} />
      </div>
      <div className="chart-card">
        <h3><FaSyncAlt /> Live Request Count</h3>
        <div className="live-count">{liveCount}</div>
      </div>
    </div>
  );
};

export default ScoreChart;
