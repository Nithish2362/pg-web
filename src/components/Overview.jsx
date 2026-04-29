import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { CreditCard, Home, Activity, CheckCircle2, MapPin } from 'lucide-react';
import './Overview.css';

const Overview = () => {
  const { data } = useOutletContext();
  
  const stats = [
    {
      label: 'Monthly Rent',
      value: `₹${data?.monthlyRent || '0.00'}`,
      icon: <CreditCard size={20} />,
      subtext: 'Due on 1st of next month',
      color: 'var(--primary)'
    },
    {
      label: 'My Space',
      value: `${data?.roomNumber || 'N/A'} - ${data?.bedNumber || 'N/A'}`,
      icon: <Home size={20} />,
      subtext: data?.floorName || 'Standard Floor',
      color: 'var(--accent)'
    },
    {
      label: 'Status',
      value: 'Paid',
      icon: <CheckCircle2 size={20} />,
      subtext: 'Registration Successful',
      color: 'var(--success)'
    }
  ];

  return (
    <div className="overview-container animate-reveal">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">
              <span style={{ color: stat.color }}>{stat.icon}</span>
              {stat.label}
            </div>
            <div className="stat-value">
              {stat.value}
            </div>
            <div className="stat-subtext">{stat.subtext}</div>
          </div>
        ))}
      </div>

      <div className="recent-activity-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h3 className="section-title" style={{ margin: 0 }}>
            <Activity size={22} className="text-primary" />
            Recent Activity
          </h3>
          <button className="btn-premium" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>View All</button>
        </div>
        
        <div className="activity-list">
          {data?.recentPayments?.length > 0 ? (
            data.recentPayments.map((p, i) => (
              <div key={i} className="activity-item">
                <div className="activity-info">
                  <div className="activity-icon">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <div className="activity-main-text">Rent Payment Processed</div>
                    <div className="activity-date">Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
                <div className="activity-amount">+₹{p.amount}</div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '60px', background: '#f8fafc', borderRadius: '16px', border: '2px dashed #e2e8f0' }}>
              <div style={{ color: '#cbd5e1', marginBottom: '16px' }}><Activity size={48} /></div>
              <p style={{ color: '#94a3b8', fontWeight: 600 }}>No recent transactions found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
