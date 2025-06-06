import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    Meteor.loginWithPassword(email, password, (err) => {
      setIsLoading(false);
      if (err) {
        setError(err.reason);
        return
      }
      navigate('/');
    });
  };

  return (
      <div className="auth-container">
        <div className="auth-card">
          <h2  className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading} 
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p>
            Don't have an account? 
            <a href="/signup">Sign up</a>
          </p>
          <p className='mt-2'>
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </div>
      </div>
    );
}