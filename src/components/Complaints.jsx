import React, { useState, useEffect } from "react";
import api from "../api/api";
import { format } from "date-fns";
import { AlertCircle, History, Send, Calendar } from "lucide-react";
import './Complaints.css';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [issue, setIssue] = useState("");
  const [loading, setLoading] = useState(false);
  const pgNumber = localStorage.getItem("agent_pg");

  const fetchComplaints = async () => {
    try {
      const res = await api.get(`/complaints/tenant/${pgNumber}`);
      setComplaints(res.data?.response || res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (pgNumber) fetchComplaints();
  }, [pgNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/complaints", { issue, pgNumber, status: "OPEN" });
      setIssue("");
      fetchComplaints();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaints-container animate-fade-in">
      <h2 className="section-title">
        <AlertCircle size={22} className="text-primary" />
        Support & Complaints
      </h2>

      <form onSubmit={handleSubmit} className="premium-card complaint-form-card">
        <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Raise a New Issue</h3>
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Describe your concern in detail..."
          className="complaint-textarea"
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ width: 'auto', padding: '14px 32px' }}
        >
          {loading ? "Submitting..." : <><Send size={18} /> Submit Complaint</>}
        </button>
      </form>

      <div className="history-section">
        <h3 className="section-title" style={{ fontSize: '1.1rem' }}>
          <History size={20} className="text-primary" />
          Complaint History
        </h3>
        
        {complaints.length === 0 ? (
          <div className="premium-card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
            No complaints recorded yet.
          </div>
        ) : (
          <div className="history-grid">
            {complaints.map((c) => (
              <div key={c.id} className="premium-card complaint-card">
                <div className="complaint-card-header">
                  <div className="complaint-date">
                    <Calendar size={14} />
                    {format(new Date(c.createdAt), "dd MMM yyyy, hh:mm a")}
                  </div>
                  <span className={`status-badge status-${c.status}`}>
                    {c.status.replace('_', ' ')}
                  </span>
                </div>
                
                <p className="complaint-issue">{c.issue}</p>
                
                {c.adminRemark && (
                  <div className="admin-remark-box">
                    <span className="admin-remark-label">Management Response</span>
                    <p className="admin-remark-content">{c.adminRemark}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;
