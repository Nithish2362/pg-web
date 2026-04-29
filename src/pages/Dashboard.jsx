import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { LogOut, User, CreditCard, LayoutDashboard, Loader2, AlertTriangle, Bell, Clock, Users, ShieldCheck } from 'lucide-react';
import { fetchDashboard } from '../api/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchDashboard();
        setData(res.response);
      } catch (err) {
        if (err.message.includes('401')) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('agent_token');
    localStorage.removeItem('agent_pg');
    localStorage.removeItem('agent_userId');
    navigate('/home');
  };

  const pgNumber = localStorage.getItem('agent_pg') || 'Tenant';

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { path: '/dashboard/profile', label: 'My Profile', icon: <User size={18} /> },
    { path: '/dashboard/payments', label: 'Payments', icon: <CreditCard size={18} /> },
    { path: '/dashboard/complaints', label: 'Complaints', icon: <AlertTriangle size={18} /> },
    { path: '/dashboard/notices', label: 'Notices', icon: <Bell size={18} /> },
    { path: '/dashboard/gatepass', label: 'Gate Pass', icon: <Clock size={18} /> },
    { path: '/dashboard/visitors', label: 'Visitors', icon: <Users size={18} /> },
  ];

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <Loader2 className="animate-spin" size={32} color="#000" />
      </div>
    );
  }

  return (
    <div className="dashboard-layout reveal">
      <aside className="sidebar">
        <div className="sidebar-logo">STAYPRO.</div>
        
        <nav style={{ flex: 1 }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <button onClick={handleLogout} className="nav-item" style={{ marginTop: 'auto', border: 'none', background: 'transparent', cursor: 'pointer', color: '#f87171' }}>
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="section-tag" style={{ marginBottom: '8px' }}>Resident Account</span>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>{data?.studentName || 'Welcome'}</h1>
            </div>

            <div className="user-profile">
              <div className="avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                {(data?.studentName || 'T').charAt(0).toUpperCase()}
              </div>
              <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{pgNumber}</span>
            </div>
          </div>
        </header>

        <section>
          <Outlet context={{ data }} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
