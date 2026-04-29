import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../api/api';

const PasswordChangeModal = ({ username, onComplete }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState({
    old: false,
    new: false,
    confirm: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleShow = (key) => {
    setShowPass(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (passwords.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await api.post('/auth/change-password', {
        username,
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      });
      onComplete();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password. Check your old password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className="login-card animate-reveal" style={{ maxWidth: '480px' }}>
        <div className="login-header">
          <div className="login-logo">
            <ShieldCheck size={32} />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '8px' }}>Security Update</h2>
          <p className="text-muted" style={{ fontSize: '0.95rem' }}>This is your first login. Please set a new secure password to continue.</p>
        </div>

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password (from email)</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.6 }} />
              <input
                type={showPass.old ? "text" : "password"}
                required
                className="login-input"
                style={{ paddingLeft: '48px', paddingRight: '48px' }}
                placeholder="Enter current OTP"
                value={passwords.oldPassword}
                onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})}
              />
              <div 
                onClick={() => toggleShow('old')}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-muted)', opacity: 0.6, display: 'flex', alignItems: 'center' }}
              >
                {showPass.old ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>New Secure Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.6 }} />
              <input
                type={showPass.new ? "text" : "password"}
                required
                className="login-input"
                style={{ paddingLeft: '48px', paddingRight: '48px' }}
                placeholder="Min. 6 characters"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
              />
              <div 
                onClick={() => toggleShow('new')}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-muted)', opacity: 0.6, display: 'flex', alignItems: 'center' }}
              >
                {showPass.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.6 }} />
              <input
                type={showPass.confirm ? "text" : "password"}
                required
                className="login-input"
                style={{ paddingLeft: '48px', paddingRight: '48px' }}
                placeholder="Repeat new password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
              />
              <div 
                onClick={() => toggleShow('confirm')}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-muted)', opacity: 0.6, display: 'flex', alignItems: 'center' }}
              >
                {showPass.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-premium"
            style={{ width: '100%', marginTop: '16px', height: '56px' }}
          >
            {loading ? "Updating Security..." : <><ShieldCheck size={20} /> Update Password</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
