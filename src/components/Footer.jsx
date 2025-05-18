import React from 'react';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: 'rgba(245,247,250,0.95)',
      color: '#333',
      padding: '1.5rem 0',
      borderTop: '1px solid #e3e8ee',
      textAlign: 'center',
      fontSize: '1rem'
    }}>
      <div style={{ marginBottom: '0.5rem' }}>
        &copy; {new Date().getFullYear()} <strong>HealthBridge</strong>. All rights reserved.
      </div>
      <div>
        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" style={{ margin: '0 8px', color: '#333' }}>
          <FaGithub size={20} />
        </a>
        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" style={{ margin: '0 8px', color: '#0077b5' }}>
          <FaLinkedin size={20} />
        </a>
        <span style={{ marginLeft: 8, color: '#e57373' }}>
          <FaHeart className="inline" /> by Team HealthBridge
        </span>
      </div>
    </footer>
  );
}
