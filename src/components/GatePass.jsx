import React, { useState, useEffect } from "react";
import api from "../api/api";
import { format } from "date-fns";
import { Clock, LogOut, LogIn, History, ArrowRightLeft } from "lucide-react";
import './GatePass.css';

const GatePass = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const pgNumber = localStorage.getItem("agent_pg");

  const fetchLogs = async () => {
    try {
      const res = await api.get(`/tenant-logs/tenant/${pgNumber}`);
      setLogs(res.data?.response || res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (pgNumber) fetchLogs();
  }, [pgNumber]);

  const handleAction = async (action) => {
    try {
      setLoading(true);
      await api.post(`/tenant-logs/${action}/${pgNumber}`);
      fetchLogs();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const latestLog = logs.length > 0 ? logs[0] : null;
  const isCurrentlyOut = latestLog && latestLog.status === "OUT";

  return (
    <div className="animate-fade-in">
      <h2 className="section-title">
        <Clock size={22} className="text-primary" />
        Gate Pass Management
      </h2>

      <div className="premium-card gatepass-hero">
        <div className="status-indicator">
          <div className="status-dot-container">
            <div className="status-dot" style={{ color: isCurrentlyOut ? 'var(--danger)' : 'var(--accent)' }}></div>
            Current Status: {isCurrentlyOut ? "OUTSIDE" : "INSIDE PG"}
          </div>
        </div>

        <div className="action-controls">
          {isCurrentlyOut ? (
            <button
              onClick={() => handleAction("in")}
              disabled={loading}
              className="gate-btn gate-btn-in"
            >
              {loading ? "Processing..." : <><LogIn size={24} /> Log Return</>}
            </button>
          ) : (
            <button
              onClick={() => handleAction("out")}
              disabled={loading}
              className="gate-btn gate-btn-out"
            >
              {loading ? "Processing..." : <><LogOut size={24} /> Log Departure</>}
            </button>
          )}
        </div>
        <p style={{ marginTop: '24px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          Your safety is our priority. Please log your movements accurately.
        </p>
      </div>

      <div className="history-section">
        <h3 className="section-title" style={{ fontSize: '1.1rem' }}>
          <History size={20} className="text-primary" />
          Movement History
        </h3>
        
        <div className="log-table-container premium-card">
          {logs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
              No logs found.
            </div>
          ) : (
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Departure</th>
                  <th>Return</th>
                  <th>Total Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(l => (
                  <tr key={l.id}>
                    <td>{l.outTime ? format(new Date(l.outTime), "dd MMM, hh:mm a") : "—"}</td>
                    <td>{l.inTime ? format(new Date(l.inTime), "dd MMM, hh:mm a") : "—"}</td>
                    <td style={{ color: 'var(--text-muted)' }}>
                      <ArrowRightLeft size={14} style={{ display: 'inline', marginRight: '8px', opacity: 0.5 }} />
                      {l.inTime && l.outTime ? 'Recorded' : 'In Progress'}
                    </td>
                    <td>
                      <span className="log-status-tag" style={{ 
                        background: l.status === 'IN' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                        color: l.status === 'IN' ? 'var(--accent)' : 'var(--danger)'
                      }}>
                        {l.status}
                      </span>
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

export default GatePass;
