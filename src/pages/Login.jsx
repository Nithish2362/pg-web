import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ArrowRight } from 'lucide-react';
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
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container reveal">
      <div className="login-card">
        <div className="login-header">
          <div className="lux-logo-mark">STAYPRO.</div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Welcome Resident.</h1>
          <p style={{ color: '#999' }}>Please authenticate to access your portal.</p>
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
            />
          </div>

          <button type="submit" className="btn-premium" style={{ width: '100%', marginTop: '32px' }} disabled={loading}>
            {loading ? 'Authenticating...' : <><LogIn size={18} /> Authenticate</>}
          </button>
        </form>

        <p style={{ marginTop: '40px', color: '#ccc', fontSize: '0.8rem' }}>
          By authenticating, you agree to our terms of residence.
        </p>
      </div>
    </div>
  );
};

export default Login;
