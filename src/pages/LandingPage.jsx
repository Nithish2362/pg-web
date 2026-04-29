import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Home, MapPin, Search, Plus } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="lux-nav">
        <div className="lux-logo">STAYPRO.</div>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} className="btn-premium">
            Access Portal
          </button>
        </div>
      </nav>

      <section className="lux-hero reveal">
        <span className="section-tag">Established 2026</span>
        <h1>Refined Living.</h1>
        <p>Curated co-living experiences for the modern academic elite. Elevate your standard of living.</p>
        <button className="btn-premium" onClick={() => navigate('/login')}>
          Enter Experience
        </button>
      </section>

      <div className="img-reveal-container reveal" style={{ animationDelay: '0.4s' }}>
        <img 
          src="https://images.unsplash.com/photo-1555854817-5b2260d50c63?q=80&w=2070&auto=format&fit=crop" 
          className="lux-full-img" 
          alt="Luxury Interior" 
        />
      </div>

      <section className="luxury-section">
        <span className="section-tag">Our Philosophy</span>
        <h2 className="lux-title reveal">More than a residence.<br />A curated community.</h2>
        
        <div className="lux-grid">
          {[
            { 
              img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', 
              title: 'Concierge Care', 
              desc: '24/7 personalized assistance for all your residential needs.' 
            },
            { 
              img: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1925&auto=format&fit=crop', 
              title: 'Smart Spaces', 
              desc: 'IoT integrated living quarters with seamless connectivity.' 
            },
            { 
              img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop', 
              title: 'Elite Security', 
              desc: 'Biometric military-grade surveillance and access control.' 
            },
          ].map((item, i) => (
            <div key={i} className="lux-card reveal" style={{ animationDelay: `${0.2 * i}s` }}>
              <img src={item.img} className="lux-card-img" alt={item.title} />
              <h3 className="lux-card-title">{item.title}</h3>
              <p className="lux-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="luxury-section" style={{ background: '#000', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '5rem', marginBottom: '40px' }}>Join the Elite.</h2>
        <button className="btn-premium" style={{ background: '#fff', color: '#000' }} onClick={() => navigate('/login')}>
          Reserve your space <Plus size={20} />
        </button>
      </section>

      <footer className="luxury-section" style={{ padding: '80px 10%', background: '#fafafa' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '80px' }}>
          <div>
            <div className="lux-logo" style={{ marginBottom: '24px' }}>STAYPRO.</div>
            <p style={{ color: '#666' }}>The future of premium academic housing.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '24px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#999' }}>
              <span>Manifesto</span>
              <span>Locations</span>
              <span>Careers</span>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '24px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Social</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#999' }}>
              <span>Instagram</span>
              <span>LinkedIn</span>
              <span>Twitter</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
