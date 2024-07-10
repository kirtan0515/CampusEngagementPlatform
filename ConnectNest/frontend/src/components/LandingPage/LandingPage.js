import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from './logo.png'; // Make sure this path is correct

const LandingPage = () => {
  return (
    <div className="main-container">
      <div className="blur-circle1"></div>
      <div className="blur-circle2"></div>

      <div className="landing-page">
        <header>
          <div className="container">
            <img src={logo} alt="ConnectNest Logo" className="landing-logo" />
            <ul className="links">
              <li><Link to="/login" className="nav-button">Login</Link></li>
              <li><Link to="/signup" className="nav-button">Sign Up</Link></li>
              <li><Link to="/help" className="nav-button">Help</Link></li>
              <li><Link to="/faqs" className="nav-button">FAQs</Link></li>
            </ul>
          </div>
        </header>
        <div className="content">
          <div className="container">
            <div className="info">
              <h1>Looking For Inspiration</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus odit nihil ullam nesciunt quidem iste, Repellendus odit nihil</p>
              <button className="cta-button"><Link to="/signup" className="cta-link">Get Started</Link></button>
            </div>
            <div className="image">
              <img className="main-image" src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-working-using-vr-tech-3840669-3202986.png?f=webp" alt="VR Tech" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
