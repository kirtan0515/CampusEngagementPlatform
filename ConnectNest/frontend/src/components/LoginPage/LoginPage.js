import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';  // Updated CSS with Neumorphism
import logo from './logo.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://umgjeh7fx8.execute-api.us-east-1.amazonaws.com/prod/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store token in localStorage
        setSuccessMessage('Login successful!');
        setErrorMessage('');
        setEmail('');
        setPassword('');
        navigate('/dashboard'); // Redirect to Dashboard
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="main">
      <div className="container b-container">
        <form className="form" onSubmit={handleLogin}>
          <img src={logo} alt="ConnectNest Logo" className="login-logo" />
          <h2 className="form_title title">Sign in to ConnectNest</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="form__input-container">
            <input
              className="form__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form__input-container">
            <input
              className="form__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form__button button">Get Started</button>
          <div className="form__links">
            <Link className="form__link" to="/signup">Create Account</Link>
            <Link className="form__link" to="/help">Need Help?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
