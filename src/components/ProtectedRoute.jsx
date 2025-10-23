// src/components/ProtectedRoute.jsx (CORRECTED)

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    // Redirects them to the login page
    return <Navigate to="/login" replace />; 
  }
  
  return children;
}

export default ProtectedRoute;