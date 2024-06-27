import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import LandingPage from './components/LandingPage/LandingPage';
import Engagements from './components/Engagements/Engagements';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  const [engagements, setEngagements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const result = await axios.get('https://umgjeh7fx8.execute-api.us-east-1.amazonaws.com/prod/engagement');
        console.log("Data fetched:", result.data.body);
        setEngagements(JSON.parse(result.data.body));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <header>
          ConnectNest - Campus Engagement Platform
        </header>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/engagements" element={<Engagements engagements={engagements} />} />
          {/* Add other routes here */}
        </Routes>
        <footer>
          &copy; {new Date().getFullYear()} ConnectNest
        </footer>
      </div>
    </Router>
  );
}

export default App;
