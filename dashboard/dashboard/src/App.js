// src/App.js
import React from 'react';
import Header from './components/Header';
import ScanDetails from './components/ScanDetails';
import VulnerabilitySummary from './components/VulnerabilitySummary';
import VulnerabilityChart from './components/VulnerabilityChart';
import './App.css';

function App() {
  // Dummy data; will be replaced with dynamic API data later
  const scanInfo = {
    url: 'http://testphp.vulnweb.com/login.php',
    scanTime: '27/08/2021 11:47 AM',
    totalRequests: 20971,
    avgSpeed: 20.2
  };

  const vulnerabilityData = {
    identified: 61,
    confirmed: 39,
    critical: 14,
    high: 32,
    medium: 5,
    low: 10,
  };

  const riskLevel = 'Critical';

  return (
    <div className="container">
      <Header title="Detailed Scan Report" riskLevel={riskLevel} />
      <ScanDetails 
        url={scanInfo.url} 
        scanTime={scanInfo.scanTime} 
        totalRequests={scanInfo.totalRequests} 
        avgSpeed={scanInfo.avgSpeed} 
      />
      <VulnerabilitySummary 
        identified={vulnerabilityData.identified} 
        confirmed={vulnerabilityData.confirmed} 
        critical={vulnerabilityData.critical} 
        high={vulnerabilityData.high} 
        medium={vulnerabilityData.medium} 
        low={vulnerabilityData.low} 
      />
      <VulnerabilityChart 
        critical={vulnerabilityData.critical} 
        high={vulnerabilityData.high} 
        medium={vulnerabilityData.medium} 
        low={vulnerabilityData.low} 
      />
    </div>
  );
}

export default App;
