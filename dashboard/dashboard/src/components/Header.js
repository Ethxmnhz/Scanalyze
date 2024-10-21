// src/components/Header.js
import React from 'react';
import { CHeader, CHeaderBrand, CHeaderNav, CNavLink, CBadge } from '@coreui/react';
import './Header.css';

const Header = ({ title, riskLevel, userRole }) => {
  return (
    <CHeader className="header">
      <CHeaderBrand className="logo">
        <h1>Scanalyze</h1>
      </CHeaderBrand>
      <CHeaderNav className="status">
        <div className="status-item">
          <CBadge color="success" className="status-icon">✓</CBadge>
          <span className="status-text">Database Connected</span>
        </div>
        <div className="status-item">
          <CBadge color="success" className="status-icon">✓</CBadge>
          <span className="status-text">API is Up</span>
        </div>
        <div className="user-role">
          <span className="role-text">User Role: </span>
          <CBadge color="info" className="role-badge">{userRole}</CBadge>
        </div>
      </CHeaderNav>
      <div className={`risk-level ${riskLevel.toLowerCase()}`}>
        Risk Level: {riskLevel}
      </div>
    </CHeader>
  );
};

export default Header;
