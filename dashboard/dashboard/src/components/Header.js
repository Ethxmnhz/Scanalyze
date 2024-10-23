import React from 'react';
import { CHeader, CHeaderBrand, CHeaderNav } from '@coreui/react';
import './Header.css';

const Header = ({ dbConnected, apiConnected, extensionConnected }) => {
  // Function to determine dot color based on connection status
  const getDotColor = (isConnected) => isConnected ? 'green-dot' : 'red-dot';

  return (
    <CHeader className="header">
      {/* Logo */}
      <CHeaderBrand className="logo">
        <h1>Scanalyze</h1>
      </CHeaderBrand>

      {/* Status Indicators */}
      <CHeaderNav className="status">
        <div className="status-item">
          <span className={`status-dot ${getDotColor(dbConnected)}`}></span>
          <span className="status-text">Database</span>
        </div>
        <div className="status-item">
          <span className={`status-dot ${getDotColor(apiConnected)}`}></span>
          <span className="status-text">Backend</span>
        </div>
        <div className="status-item">
          <span className={`status-dot ${getDotColor(extensionConnected)}`}></span>
          <span className="status-text">Extension</span>
        </div>
      </CHeaderNav>
    </CHeader>
  );
};

export default Header;
