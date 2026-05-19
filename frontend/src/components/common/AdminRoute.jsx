import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { profile, isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Verifying permissions...</div>;
  }

  if (!isAuthenticated || profile?.role !== 'ADMIN') {
    // If not logged in OR not an admin, redirect to login
    // We could also redirect to a "Forbidden" page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;