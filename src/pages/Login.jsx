import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ArrowRight, Home, Sparkles } from 'lucide-react';
import { login } from '../api/api';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [pgNumber, setPgNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await login(pgNumber, password);
      const { token, username, userId } = response.response;
      localStorage.setItem('agent_token', token);
      localStorage.setItem('agent_pg', username);
      localStorage.setItem('agent_userId', userId);
      navigate('/dashboard');
    } catch (err) {
      setError('Oops! Credentials don\'t match our records.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card animate-reveal">
        <div className="login-header">
          <div className="login-logo">
            <Home size={28} />
          </div>
          <h1 style={{ fontSize: '2.25rem', color: 'var(--text-main)' }}>Welcome Home.</h1>
          <p className="text-muted">Sign in to your Happy Stay portal</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Residential ID</label>
            <input 
              type="text" 
              className="login-input" 
              placeholder="e.g. PG-0001"
              value={pgNumber}
              onChange={(e) => setPgNumber(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Security Key</label>
            <input 
              type="password" 
              className="login-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="btn-premium" style={{ width: '100%', marginTop: '16px' }} disabled={loading}>
            {loading ? 'Signing in...' : <><LogIn size={18} /> Sign In</>}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            New resident? <span className="text-primary" style={{ fontWeight: 700, cursor: 'pointer' }}>Contact Management</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
