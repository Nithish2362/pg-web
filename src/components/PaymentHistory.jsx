import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Loader2 } from 'lucide-react';
import { fetchPayments } from '../api/api';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const response = await fetchPayments();
        setPayments(response.response || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPayments();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Loader2 className="animate-spin" size={32} color="var(--primary-color)" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Payment History</h2>
        <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          Make Payment
        </button>
      </div>

      {error ? (
        <div style={{ color: 'var(--danger-color)', textAlign: 'center' }}>{error}</div>
      ) : (
        <div style={{ overflowX: 'auto', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '16px 24px', fontWeight: '500' }}>Transaction ID</th>
                <th style={{ padding: '16px 24px', fontWeight: '500' }}>Date</th>
                <th style={{ padding: '16px 24px', fontWeight: '500' }}>Amount</th>
                <th style={{ padding: '16px 24px', fontWeight: '500' }}>Method</th>
                <th style={{ padding: '16px 24px', fontWeight: '500' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '16px 24px', fontWeight: '500' }}>{payment.transactionId || `PAY-${payment.id}`}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{payment.paymentDate}</td>
                    <td style={{ padding: '16px 24px', fontWeight: '600' }}>${payment.amount}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{payment.paymentMethod}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-color)' }}>
                        <CheckCircle size={14} />
                        Completed
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No payment history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
