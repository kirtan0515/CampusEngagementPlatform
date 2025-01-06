import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from './logo.png';

const LandingPage = () => {
  return (
    <div className="main-container">
      <div className="blur-circle1"></div>
      <div className="blur-circle2"></div>

      <div className="landing-page">
        <div className="content">
          <div className="info">
            <h1>Unite. Engage. Inspire.</h1>
            <p>Discover a new way to stay connected and engaged with your campus community. Whether you're a student, faculty, or staff, ConnectNest is here to bring everyone together.</p>
            <button className="cta-button">
              <Link to="/signup" className="cta-link">Get Started</Link>
            </button>
          </div>
          <div className="image">
            <img className="main-image" src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-working-using-vr-tech-3840669-3202986.png?f=webp" alt="VR Tech" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
