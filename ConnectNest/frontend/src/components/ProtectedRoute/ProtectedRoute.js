import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (!exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return exp > now;
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
