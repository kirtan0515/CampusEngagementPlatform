import React, { useState } from 'react';
import './SignUpPage.css'; // Make sure you link the updated Neumorphism CSS

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
        <div className="container a-container">
          <form className="form" onSubmit={handleSignUp}>
            <h2 className="form_title title">Create Account</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="form__input-container">
              <input
                className="form__input"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="form__input-container">
              <input
                className="form__input"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="form__button button submit">SIGN UP</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
