import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User } from 'lucide-react';
import { login } from '../api/api';

const Login = () => {
  const navigate = useNavigate();
  const [pgNumber, setPgNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!pgNumber || !password) {
      setError('Please enter both PG Number and Password');
      return;
    }

    setLoading(true);
    try {
      const response = await login(pgNumber, password);
      const { token, username, userId } = response.response;
      
      localStorage.setItem('agent_token', token);
      localStorage.setItem('agent_pg', username);
      localStorage.setItem('agent_userId', userId);
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '40px', textAlign: 'center' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ background: 'var(--primary-color)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <User size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0 0 8px' }}>Agent Portal</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Sign in to manage your account</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <div>
            <label className="label" htmlFor="pgNumber">PG Number / Username</label>
            <input 
              type="text" 
              id="pgNumber"
              className="input-field" 
              placeholder="e.g. PG-0001"
              value={pgNumber}
              onChange={(e) => setPgNumber(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              className="input-field" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '10px', width: '100%' }} disabled={loading}>
            {loading ? 'Signing in...' : <><LogIn size={18} /> Sign In</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
