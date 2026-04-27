import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, CreditCard, LayoutDashboard, Loader2 } from 'lucide-react';
import TenantDetails from '../components/TenantDetails';
import PaymentHistory from '../components/PaymentHistory';
import { fetchDashboard } from '../api/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pgNumber = localStorage.getItem('agent_pg') || 'Agent';

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetchDashboard();
        setData(response.response);
      } catch (err) {
        setError(err.message);
        if (err.message.includes('401') || err.message.includes('token')) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('agent_token');
    localStorage.removeItem('agent_pg');
    localStorage.removeItem('agent_userId');
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { path: '/dashboard/details', label: 'My Details', icon: <User size={20} /> },
    { path: '/dashboard/payments', label: 'Payments', icon: <CreditCard size={20} /> },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary-color)" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Sidebar */}
      <div className="glass-panel" style={{ width: '250px', margin: '20px', display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ background: 'var(--primary-color)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={20} color="white" />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Welcome back,</div>
            <div style={{ fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{data?.studentName || pgNumber}</div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard/');
            return (
              <Link 
                key={item.path} 
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  color: isActive ? 'white' : 'var(--text-muted)',
                  background: isActive ? 'var(--primary-color)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  fontWeight: isActive ? '600' : '400'
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--danger-color)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            marginTop: 'auto',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px 20px 20px 0', display: 'flex', flexDirection: 'column' }}>
        <div className="glass-panel animate-fade-in" style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {error ? (
            <div style={{ color: 'var(--danger-color)', textAlign: 'center', marginTop: '40px' }}>
              <h3>Error loading data</h3>
              <p>{error}</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Overview data={data} />} />
              <Route path="/details" element={<TenantDetails />} />
              <Route path="/payments" element={<PaymentHistory />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
};

const Overview = ({ data }) => (
  <div>
    <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Dashboard Overview</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '24px', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>Monthly Rent</div>
        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-color)' }}>
          ${data?.monthlyRent || '0.00'}
        </div>
      </div>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '24px', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>Room & Bed</div>
        <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
          {data?.roomNumber} - {data?.bedNumber}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{data?.floorName}</div>
      </div>
      <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '24px', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>Total Payments</div>
        <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{data?.totalPayments || 0} Transactions</div>
      </div>
    </div>

    <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Recent Activity</h3>
    <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px', border: '1px solid var(--surface-border)', padding: '16px' }}>
      {data?.recentPayments?.length > 0 ? (
        data.recentPayments.map((p, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: i < data.recentPayments.length - 1 ? '1px solid var(--surface-border)' : 'none' }}>
            <span>Payment received</span>
            <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>+${p.amount}</span>
          </div>
        ))
      ) : (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No recent payments found</div>
      )}
    </div>
  </div>
);

export default Dashboard;
