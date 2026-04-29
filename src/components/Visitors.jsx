import React, { useState, useEffect } from "react";
import api from "../api/api";
import { format } from "date-fns";
import { Users, UserPlus, Phone, MessageSquare, LogIn, LogOut, ClipboardList } from "lucide-react";
import './Visitors.css';

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [form, setForm] = useState({ visitorName: "", phone: "", purpose: "" });
  const [loading, setLoading] = useState(false);
  const pgNumber = localStorage.getItem("agent_pg");

  const fetchVisitors = async () => {
    try {
      const res = await api.get(`/visitors/tenant/${pgNumber}`);
      setVisitors(res.data?.response || res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (pgNumber) fetchVisitors();
  }, [pgNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/visitors", { ...form, pgNumber });
      setForm({ visitorName: "", phone: "", purpose: "" });
      fetchVisitors();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="section-title">
        <Users size={22} className="text-primary" />
        Visitor Management
      </h2>

      <form onSubmit={handleSubmit} className="premium-card complaint-form-card">
        <h3 style={{ marginBottom: '24px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <UserPlus size={20} className="text-primary" />
          Request Visitor Pass
        </h3>
        
        <div className="visitor-form-grid">
          <div className="form-group">
            <label>Visitor Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={form.visitorName}
              onChange={(e) => setForm({ ...form, visitorName: e.target.value })}
              className="login-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="login-input"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Purpose of Visit</label>
          <textarea
            placeholder="E.g., Delivery, Family Visit, etc."
            value={form.purpose}
            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
            className="complaint-textarea"
            rows="2"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ width: 'auto', padding: '14px 32px' }}
        >
          {loading ? "Requesting..." : <><Send size={18} /> Submit Request</>}
        </button>
      </form>

      <div className="history-section">
        <h3 className="section-title" style={{ fontSize: '1.1rem' }}>
          <ClipboardList size={20} className="text-primary" />
          Visitor Pass History
        </h3>
        
        <div className="log-table-container premium-card">
          {visitors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
              No visitor passes requested.
            </div>
          ) : (
            <table className="premium-table visitor-history-table">
              <thead>
                <tr>
                  <th>Visitor Details</th>
                  <th>Purpose</th>
                  <th>Requested On</th>
                  <th>Status</th>
                  <th>Entry / Exit</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map(v => (
                  <tr key={v.id}>
                    <td>
                      <div className="visitor-details-cell">
                        <span className="visitor-name">{v.visitorName}</span>
                        {v.phone && <span className="visitor-phone"><Phone size={12} /> {v.phone}</span>}
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MessageSquare size={14} opacity={0.5} />
                        {v.purpose}
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                      {format(new Date(v.requestDate), "dd MMM yyyy")}
                    </td>
                    <td>
                      <span className={`status-badge status-${v.status}`}>
                        {v.status}
                      </span>
                    </td>
                    <td>
                      <div className="visitor-time-box">
                        {v.inTime && (
                          <div className="time-row in">
                            <LogIn size={12} /> {format(new Date(v.inTime), "hh:mm a")}
                          </div>
                        )}
                        {v.outTime && (
                          <div className="time-row out">
                            <LogOut size={12} /> {format(new Date(v.outTime), "hh:mm a")}
                          </div>
                        )}
                        {!v.inTime && <span style={{ color: 'var(--text-dim)' }}>Pending Arrival</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// Re-using Send icon for button
const Send = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;

export default Visitors;
