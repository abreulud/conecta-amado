import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    Accounts.createUser({
      email, 
      password, 
      profile: { name } 
    }, (err) => {
      setIsLoading(false);
      if(err){
        setError(err.reason);
        return;
      }
      navigate('/');
    });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Sign Up</h2>
      {error && <div style={{ color: 'red', margin: '1rem 0' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '1rem 0' }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ margin: '1rem 0' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ margin: '1rem 0' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength='8'
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ margin: '1rem 0' }}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength='8'
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" disabled={isLoading} style={{ padding: '0.5rem 1rem' }}>
          {isLoading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}