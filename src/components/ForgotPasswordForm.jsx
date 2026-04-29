import React, { useState } from 'react';
import { Mail, Key, ShieldCheck, ArrowLeft, RefreshCw, Eye, EyeOff } from 'lucide-react';
import api from '../api/api';

const ForgotPasswordForm = ({ onBack }) => {
  const [step, setStep] = useState(1); // 1: Request OTP, 2: Verify & Reset
  const [loginId, setLoginId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { loginId });
      setStep(2);
      setSuccess('OTP sent to your registered email.');
    } catch (err) {
      setError(err.response?.data?.message || 'User not found or something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/reset-password', {
        username: loginId,
        otp,
        newPassword
      });
      setSuccess('Password reset successful! Please login.');
      setTimeout(onBack, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP or reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="login-header">
        <div className="login-logo" onClick={onBack} style={{ cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </div>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--text-main)' }}>
          {step === 1 ? 'Reset Password' : 'Verify OTP'}
        </h1>
        <p className="text-muted">
          {step === 1 
            ? 'Enter your ID, Email or Mobile to receive an OTP' 
            : 'Enter the OTP sent to your email and set a new password'}
        </p>
      </div>

      {error && <div className="error-banner">{error}</div>}
      {success && <div className="success-banner" style={{ background: '#ecfdf5', color: '#059669', padding: '12px', borderRadius: '12px', marginBottom: '16px', fontSize: '0.9rem' }}>{success}</div>}

      {step === 1 ? (
        <form onSubmit={handleRequestOtp}>
          <div className="form-group">
            <label>Residential ID / Email / Mobile</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                className="login-input" 
                style={{ paddingLeft: '44px' }}
                placeholder="PG-XXXX or email@domain.com"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-premium" style={{ width: '100%', marginTop: '16px' }} disabled={loading}>
            {loading ? 'Sending OTP...' : <><RefreshCw size={18} /> Send OTP</>}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label>6-Digit OTP</label>
            <div className="relative">
              <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                className="login-input" 
                style={{ paddingLeft: '44px' }}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>New Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPass ? "text" : "password"} 
                className="login-input" 
                placeholder="Min. 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <div 
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-muted)', opacity: 0.6, display: 'flex', alignItems: 'center' }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPass ? "text" : "password"} 
                className="login-input" 
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-premium" style={{ width: '100%', marginTop: '16px' }} disabled={loading}>
            {loading ? 'Resetting...' : <><ShieldCheck size={18} /> Reset Password</>}
          </button>
        </form>
      )}

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }} onClick={onBack}>
          Back to <span className="text-primary" style={{ fontWeight: 700 }}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
