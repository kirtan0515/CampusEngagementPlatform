import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from './logo.png';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="ConnectNest Logo" className="logo" />
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/engagements">Engagements</Link>
          <Link to="/help">Help</Link>
          <Link to="/faqs">FAQs</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
