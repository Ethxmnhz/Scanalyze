// src/components/ScanDetails.js
import React from 'react';

const ScanDetails = ({ url, scanTime, totalRequests, avgSpeed }) => {
  return (
    <div className="scan-details">
      <p><strong>URL:</strong> {url}</p>
      <p><strong>Scan Time:</strong> {scanTime}</p>
      <p><strong>Total Requests:</strong> {totalRequests}</p>
      <p><strong>Average Speed:</strong> {avgSpeed} r/s</p>
    </div>
  );
};

export default ScanDetails;
