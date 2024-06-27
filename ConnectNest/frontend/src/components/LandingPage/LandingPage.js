import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from './logo.png';

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <img src={logo} alt="ConnectNest Logo" className="landing-logo" />
        <nav className="landing-nav">
          <Link to="/login" className="nav-button">Login</Link>
          <Link to="/signup" className="nav-button">Sign Up</Link>
          <Link to="/help" className="nav-button">Help</Link>
          <Link to="/faqs" className="nav-button">FAQs</Link>
        </nav>
      </header>
      
      <main className="landing-main">
        <h1 className="landing-title">Always Ready to Connect You</h1>
        <p className="landing-subtitle">Your Campus Engagement Platform</p>

        <section className="landing-features">
          <h2 className="features-title">Features</h2>
          <ul className="features-list">
            <li>Group Pages: Dedicated pages for each student organization.</li>
            <li>Event Calendars: Integrated event calendars to keep track of all activities.</li>
            <li>File Sharing: Share important documents and resources easily.</li>
            <li>Push Notifications: Get real-time updates about events and announcements.</li>
            <li>Personalized Recommendations: Machine learning-powered suggestions for events and groups.</li>
            <li>Secure Access: Robust authentication and authorization with 2FA.</li>
          </ul>
        </section>

        <Link to="/signup" className="cta-button">Get Started</Link>
      </main>
    </div>
  );
}

export default LandingPage;
