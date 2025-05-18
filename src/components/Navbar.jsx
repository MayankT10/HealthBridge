import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Medicine Tracker', href: '/medicine-tracker' },
    { name: 'Symptom Checker', href: '/symptom-checker' },
    { name: 'Clinics Nearby', href: '/clinics-nearby' },
    { name: 'Settings', href: '/settings' },
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>HealthBridge</div>

      <div style={styles.desktopMenu}>
        {navItems.map(item => (
          <Link
            key={item.name}
            to={item.href}
            style={{
              ...styles.link,
              borderBottom: location.pathname === item.href ? '2px solid #fff' : 'none'
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div style={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.href}
              style={{ ...styles.link, display: 'block', padding: '0.75rem 0' }}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    background: 'linear-gradient(to right, #1976d2, #004ba0)',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    flexWrap: 'wrap',
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  desktopMenu: {
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  },
  menuIcon: {
    display: 'none',
    cursor: 'pointer',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    background: '#1565c0',
    padding: '1rem 2rem',
    textAlign: 'left',
    animation: 'fadeIn 0.3s ease-in-out',
  },
};

// Responsive styles using JS
if (typeof window !== 'undefined') {
  const mq = window.matchMedia('(max-width: 768px)');
  const updateStyles = () => {
    styles.desktopMenu.display = mq.matches ? 'none' : 'flex';
    styles.menuIcon.display = mq.matches ? 'block' : 'none';
  };
  updateStyles();
  mq.addListener(updateStyles);
}
