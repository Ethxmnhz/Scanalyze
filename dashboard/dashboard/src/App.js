// src/App.js
import React from 'react';
import Header from './components/Header';
import VulnerabilityCard from './components/VulnerabilityCard';
import ScanInfo from './components/ScanInfo';
import ScoreChart from './components/ScoreChart';
import './App.css';

function App() {
  // Dummy data; will be replaced with dynamic API data later
  const scanInfo = {
    url: 'http://testphp.vulnweb.com/login.php',
    serverName: 'Apache',
    scanTime: '27/08/2021 11:47 AM',
    totalRequests: 20971,
    score: 3,  // 1-5 score based on vulnerability analysis
  };

  return (
    <div className="dashboard-container">
      <Header title="Scanalyze Dashboard" />
      <div className="dashboard-content">
        <ScanInfo
          url={scanInfo.url}
          serverName={scanInfo.serverName}
          scanTime={scanInfo.scanTime}
          totalRequests={scanInfo.totalRequests}
          score={scanInfo.score}
        />

        <div className="vulnerability-section">
          <VulnerabilityCard title="CORS Vulnerability" status="Critical" />
          <VulnerabilityCard title="Clickjacking Vulnerability" status="High" />
          <VulnerabilityCard title="Future Vulnerability" status="None" />
        </div>

        <ScoreChart score={scanInfo.score} />
      </div>
    </div>
  );
}

export default App;
