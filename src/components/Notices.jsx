import React, { useState, useEffect } from "react";
import api from "../api/api";
import { format } from "date-fns";
import { Bell, Calendar, Info } from "lucide-react";
import './Notices.css';

const Notices = () => {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const res = await api.get("/notices/active");
      setNotices(res.data?.response || res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="animate-fade-in">
      <h2 className="section-title">
        <Bell size={22} className="text-primary" />
        Important Announcements
      </h2>

      {notices.length === 0 ? (
        <div className="premium-card" style={{ textAlign: 'center', padding: '60px', color: 'var(--text-dim)' }}>
          <Info size={40} style={{ marginBottom: '16px', opacity: 0.5 }} />
          <p>No active notices at the moment.</p>
        </div>
      ) : (
        <div className="notices-grid">
          {notices.map((n) => (
            <div key={n.id} className="premium-card notice-card">
              <div className="notice-accent"></div>
              
              <div className="notice-header">
                <h3 className="notice-title">{n.title}</h3>
                <div className="notice-date-badge">
                  {format(new Date(n.createdAt), "dd MMM")}
                </div>
              </div>
              
              <p className="notice-content">{n.content}</p>
              
              <div className="notice-footer">
                <Calendar size={14} />
                Posted on {format(new Date(n.createdAt), "MMMM dd, yyyy")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notices;
