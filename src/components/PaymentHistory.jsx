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

      <div className="log-table-container premium-card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>Loading transactions...</div>
        ) : payments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-dim)' }}>
            No payment history found.
          </div>
        ) : (
          <table className="premium-table">
            <thead>
              <tr>
                <th>Receipt #</th>
                <th>Amount</th>
                <th>Month / Year</th>
                <th>Payment Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>#{p.id}</span></td>
                  <td style={{ fontWeight: '700', fontSize: '1.1rem' }}>₹{p.amount}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={14} className="text-primary" />
                      {p.paymentMonth} {p.paymentYear}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{p.paymentDate}</td>
                  <td>
                    <span className={`payment-status-pill pay-${p.status}`}>
                      <ArrowUpRight size={12} style={{ display: 'inline', marginRight: '4px' }} />
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
