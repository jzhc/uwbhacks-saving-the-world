// src/pages/Home.jsx
import React from 'react';
import Auth from './Auth';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import SignIn from '../components/SignIn';

export default function Home() {
  const { user } = useAuth();

  // If no user, show the Google Sign-In button
  if (!user) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Welcome to BillIdeas!</h1>
        <p>Please sign in to submit your ideas:</p>
        <Auth></Auth>
      </div>
    );
  }

  // Otherwise show the actual home page
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome back, {user.displayName}!</h1>
      <p>Here’s where your dashboard or list of bills will go.</p>
    </div>
  );
}