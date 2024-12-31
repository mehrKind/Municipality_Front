import React from 'react';
import { Navigate } from 'react-router-dom';

const Security = ({ children }) => {
  // Check for the bearer token in local storage
  const token = localStorage.getItem('accessToken');

  // If the token does not exist, redirect to a login page or show a message
  if (!token) {
    return <Navigate to="/login" />; // Redirect to Home or a login page
  }

  // If the token exists, render the children
  return <>{children}</>;
};

export default Security;
