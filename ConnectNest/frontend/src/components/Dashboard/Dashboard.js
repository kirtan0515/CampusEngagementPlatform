import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [fullName, setFullName] = useState('Kirtan Patel'); // Replace with actual user data

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
    // Fetch user data and set the full name here
    // Example: setFullName('Jane Smith');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>{greeting}, {fullName}!</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <nav className="dashboard-nav">
        <ul>
          <li><a href="/group-pages">Group Pages</a></li>
          <li><a href="/event-calendar">Event Calendar</a></li>
          <li><a href="/file-sharing">File Sharing</a></li>
          <li><a href="/post-something">Post Something</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
