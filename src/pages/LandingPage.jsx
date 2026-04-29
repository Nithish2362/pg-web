import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Home, MapPin, Search, Plus, Sparkles, Coffee, Wifi, Heart } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="happy-nav">
        <div className="happy-logo">
          <div style={{ background: 'var(--primary)', color: 'white', padding: '6px', borderRadius: '8px', display: 'flex' }}>
            <Home size={20} />
          </div>
          Happy Stay
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} className="btn-premium">
            Resident Portal
          </button>
        </div>
      </nav>

      <section className="happy-hero animate-reveal">
        <div className="badge"><Sparkles size={14} inline /> Modern Co-Living 2026</div>
        <h1>Your Home,<br /><span className="text-primary">Only Happier.</span></h1>
        <p>Experience the next generation of co-living. Beautiful spaces, vibrant community, and zero stress.</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-premium" onClick={() => navigate('/login')}>
            Get Started <ArrowRight size={18} />
          </button>
          <button className="btn-premium" style={{ background: 'transparent', border: '1px solid #ddd', color: '#333' }}>Explore Spaces</button>
        </div>
      </section>

      <section className="feature-section">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3rem' }}>Why Happy Stay?</h2>
          <p className="text-muted">Everything you need for a comfortable stay.</p>
        </div>
        
        <div className="feature-grid">
          {[
            { 
              icon: <Coffee />, 
              title: 'Superb Amenities', 
              desc: 'High-speed internet, gourmet kitchen, and 24/7 laundry services.' 
            },
            { 
              icon: <Wifi />, 
              title: 'Gigabit Connectivity', 
              desc: 'Seamless WiFi across all common areas and private rooms.' 
            },
            { 
              icon: <Heart />, 
              title: 'Joyful Community', 
              desc: 'Regular events and mixers to help you build lasting connections.' 
            },
          ].map((item, i) => (
            <div key={i} className="feature-card animate-reveal" style={{ animationDelay: `${0.1 * i}s` }}>
              <div className="icon-box">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section animate-reveal">
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        <h2>Ready to move in?</h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '40px' }}>Join 500+ happy residents across the country.</p>
        <button className="btn-premium" style={{ background: 'white', color: 'var(--primary)', padding: '16px 48px', fontSize: '1.1rem' }} onClick={() => navigate('/login')}>
          Reserve Your Space Now
        </button>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="happy-logo footer-logo">Happy Stay</div>
            <p className="text-muted">The future of modern co-living experiences.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <div className="footer-links">
              <span>Our Story</span>
              <span>Locations</span>
              <span>Help Center</span>
            </div>
          </div>
          <div>
            <h4>Connect</h4>
            <div className="footer-links">
              <span>Instagram</span>
              <span>LinkedIn</span>
              <span>Twitter</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '80px', borderTop: '1px solid #f1f5f9', paddingTop: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
          © 2026 Happy Stay Living. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
