import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupPages from './GroupPages/GroupPages';
import EventCalendar from './EventCalendar/EventCalendar';
import FileSharing from './FileSharing/FileSharing';
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
      <div className="dashboard-content">
        <section className="group-pages">
          <h3>Group Pages</h3>
          <GroupPages />
        </section>
        <section className="event-calendar">
          <h3>Event Calendar</h3>
          <EventCalendar />
        </section>
        <section className="file-sharing">
          <h3>File Sharing</h3>
          <FileSharing />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
