import React from 'react';
import './ScanInfo.css';

const ScanInfo = ({ url, serverName, scanTime, totalRequests, score }) => {
  return (
    <div className="scan-info">
      <p><strong>URL:</strong> {url}</p>
      <p><strong>Server:</strong> {serverName}</p>
      <p><strong>Scan Time:</strong> {scanTime}</p>
      <p><strong>Total Requests:</strong> {totalRequests}</p>
      <p><strong>Security Score:</strong> <span className={`score-${score}`}>{score}</span></p>
    </div>
  );
};

export default ScanInfo;
