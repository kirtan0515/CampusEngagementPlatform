import React, { useState } from 'react';
import './SignUpPage.css';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('https://umgjeh7fx8.execute-api.us-east-1.amazonaws.com/prod/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        setSuccessMessage('User created successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="sign-up-page">
      <div className="main">
        <div className="container b-container">
          <div className="switch">
            <div className="switch__container">
              <h2 className="switch__title">Welcome Back!</h2>
              <p className="switch__description">To keep connected with us please login with your personal info</p>
              <button className="switch__button">SIGN IN</button>
            </div>
          </div>
        </div>
        <div className="container a-container">
          <form className="form" onSubmit={handleSignUp}>
            <h2 className="form_title title">Create Account</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="form__icons">
              <img className="form__icon" src="google-icon.svg" alt="Google" />
              <img className="form__icon" src="outlook-icon.svg" alt="Outlook" />
              <img className="form__icon" src="linkedin-icon.svg" alt="LinkedIn" />
            </div>
            <span className="form__span">or use email for registration</span>
            <input
              className="form__input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="form__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="form__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="form__input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className="form__button button submit">SIGN UP</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
