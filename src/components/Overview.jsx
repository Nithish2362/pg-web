import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { CreditCard, Home, Activity, CheckCircle2 } from 'lucide-react';
import './Overview.css';

const Overview = () => {
  const { data } = useOutletContext();
  
  const stats = [
    {
      label: 'Monthly Rent',
      value: `₹${data?.monthlyRent || '0.00'}`,
      icon: <CreditCard size={18} />,
      subtext: 'Next billing on 1st of month',
      color: 'var(--primary)'
    },
    {
      label: 'Room & Bed',
      value: `${data?.roomNumber || 'N/A'} - ${data?.bedNumber || 'N/A'}`,
      icon: <Home size={18} />,
      subtext: data?.floorName || 'Standard Floor',
      color: 'var(--accent)'
    },
    {
      label: 'Total Payments',
      value: `${data?.totalPayments || 0}`,
      icon: <CheckCircle2 size={18} />,
      subtext: 'Successful transactions',
      color: 'var(--warning)'
    }
  ];

  return (
    <div className="overview-container animate-fade-in">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="premium-card stat-card">
            <div className="stat-label">
              <span style={{ color: stat.color }}>{stat.icon}</span>
              {stat.label}
            </div>
            <div className="stat-value" style={{ color: stat.color === 'var(--primary)' ? '#fff' : 'inherit' }}>
              {stat.value}
            </div>
            <div className="stat-subtext">{stat.subtext}</div>
          </div>
        ))}
      </div>

      <div className="recent-activity-section">
        <h3 className="section-title">
          <Activity size={22} className="text-primary" />
          Recent Activity
        </h3>
        
        <div className="activity-list">
          {data?.recentPayments?.length > 0 ? (
            data.recentPayments.map((p, i) => (
              <div key={i} className="activity-item">
                <div className="activity-info">
                  <div className="activity-icon">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <div className="activity-main-text">Rent Payment Received</div>
                    <div className="activity-date">Processed on {new Date().toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="activity-amount">+₹{p.amount}</div>
              </div>
            ))
          ) : (
            <div className="premium-card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
              No recent activity found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
