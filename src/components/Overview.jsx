import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Overview = () => {
  const { data } = useOutletContext();
  
  return (
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
};

export default Overview;

