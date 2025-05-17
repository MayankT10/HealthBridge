import React from 'react';

export default function Navbar() {
  return (
    <nav style={{
      background: '#1976d2',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>HealthBridge</span>
      <span>
        <a href="#" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Dashboard</a>
        <a href="#" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Medicine Tracker</a>
        <a href="#" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Symptom Checker</a>
        <a href="#" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Clinics Nearby</a>
        <a href="#" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Settings</a>
      </span>
    </nav>
  );
}