import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    Accounts.forgotPassword({ email }, (err) => {
      setIsLoading(false);
      if (err) {
        setError(err.reason);
        return;
      }
      setMessage(`Password reset email sent to ${email}`);
      setError('');
      setTimeout(() => navigate('/login'), 3000);
    });
  };

  return (
    <div className="auth-form">
      <h2>Reset Password</h2>
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Reset Password'}
        </button>
      </form>
      <p>
        Remember your password? <a href="/login">Login</a>
      </p>
    </div>
  );
};