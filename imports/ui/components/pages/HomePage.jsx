import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <h2>Welcome, {user?.profile?.name || 'User'}</h2>
      <p>Email: {user?.emails?.[0].address}</p>
      <button 
        onClick={handleLogout}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        Logout
      </button>
    </div>
  );
}