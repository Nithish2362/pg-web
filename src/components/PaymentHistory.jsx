import React, { useState, useEffect } from 'react';
import { fetchPayments } from '../api/api';
import { CreditCard, Calendar, Hash, ArrowUpRight } from 'lucide-react';
import './History.css';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const res = await fetchPayments();
        setPayments(res.response || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPayments();
  }, []);

  return (
    <div className="animate-fade-in">
      <h2 className="section-title">
        <CreditCard size={22} className="text-primary" />
        Payment History
      </h2>

      <div className="premium-table-container animate-reveal">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>Loading transactions...</div>
        ) : payments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-dim)' }}>
            <div style={{ marginBottom: '16px', opacity: 0.5 }}><CreditCard size={48} style={{ margin: '0 auto' }} /></div>
            <p style={{ fontWeight: 600 }}>No payment history found.</p>
          </div>
        ) : (
          <table className="premium-table">
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td><span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.85rem' }}>#{p.id.substring(0, 8)}</span></td>
                  <td style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-main)' }}>₹{p.amount}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                      <Calendar size={14} className="text-primary" />
                      Rent: {p.paymentMonth} {p.paymentYear}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{p.paymentDate}</td>
                  <td>
                    <span className={`status-badge status-${p.status}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
