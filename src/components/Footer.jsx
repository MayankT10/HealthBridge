import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: '#f5f5f5',
      color: '#555',
      textAlign: 'center',
      padding: '1rem',
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%'
    }}>
      &copy; {new Date().getFullYear()} HealthBridge. All rights reserved.
    </footer>
  );
}