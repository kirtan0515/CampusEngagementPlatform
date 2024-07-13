import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import LandingPage from './components/LandingPage/LandingPage';
import Engagements from './components/Engagements/Engagements';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header'; // Import Header component
import Footer from './components/Footer/Footer'; // Import Footer component
import './App.css';

function App() {
  const [engagements, setEngagements] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

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

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);

  return (
    <Router>
      <div>
        <Header isAuthenticated={isAuthenticated} /> {/* Pass isAuthenticated prop */}
        <div className="main-content">
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
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
