import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ArrowRight, Home, Sparkles, Eye, EyeOff, Shield, Zap, Users, Star } from 'lucide-react';
import { login } from '../api/api';
import PasswordChangeModal from '../components/PasswordChangeModal';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [pgNumber, setPgNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [mode, setMode] = useState('login'); // 'login' or 'forgot'
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await login(pgNumber, password);
      const { token, username, userId, isFirstLogin } = response.response;

      localStorage.setItem('agent_token', token);
      localStorage.setItem('agent_pg', username);
      localStorage.setItem('agent_userId', userId);

      if (isFirstLogin) {
        setTempUsername(username);
        setShowChangePassword(true);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Oops! Credentials don\'t match our records.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordResetComplete = () => {
    setShowChangePassword(false);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      {/* Left Section - Image & Branding */}
      <div className="login-left-section">
        <img 
          src="/home/ssb/.gemini/antigravity/brain/99f2f62b-c360-450e-8678-9fcc534296ed/premium_hostel_login_bg_1777471239652.png" 
          alt="Premium Living" 
          className="login-bg-image"
        />
        <div className="login-left-overlay"></div>
        <div className="login-left-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '100px', marginBottom: '24px', backdropFilter: 'blur(10px)' }}>
            <Sparkles size={16} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Premium Co-Living</span>
          </div>
          <h1>Experience <br /> Luxury Living.</h1>
          <p>The smartest way to manage your stay. Fast, secure, and designed for your comfort.</p>
          
          <div className="feature-list">
            <div className="feature-item">
              <Shield size={20} />
              <span>Secure Access</span>
            </div>
            <div className="feature-item">
              <Zap size={20} />
              <span>Instant Updates</span>
            </div>
            <div className="feature-item">
              <Users size={20} />
              <span>Community First</span>
            </div>
            <div className="feature-item">
              <Star size={20} />
              <span>Top Rated Services</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="login-right-section">
        <div className="login-card">
          {mode === 'forgot' ? (
            <ForgotPasswordForm onBack={() => setMode('login')} />
          ) : (
            <>
              <div className="login-header">
                <div className="login-logo">
                  <Home size={28} />
                </div>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '8px', fontWeight: 800 }}>Welcome Back.</h1>
                <p className="text-muted" style={{ fontSize: '1.05rem' }}>Sign in to manage your premium residence.</p>
              </div>

              {error && <div className="error-banner">{error}</div>}

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>PG ID / Mobile No / Email</label>
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
                  <label>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="login-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <div 
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-muted)', opacity: 0.6, display: 'flex', alignItems: 'center' }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginBottom: '16px' }}>
                  <span
                    className="text-primary"
                    style={{ fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}
                    onClick={() => setMode('forgot')}
                  >
                    Forgot Password?
                  </span>
                </div>

                <button type="submit" className="btn-premium" style={{ width: '100%', height: '56px' }} disabled={loading}>
                  {loading ? 'Validating Account...' : <><LogIn size={20} /> Sign In to Portal</>}
                </button>
              </form>
              
              <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  By signing in, you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b>.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {showChangePassword && (
        <PasswordChangeModal
          username={tempUsername}
          onComplete={handlePasswordResetComplete}
        />
      )}
    </div>
  );
};

export default Login;
