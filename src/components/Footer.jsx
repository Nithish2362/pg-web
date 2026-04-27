import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--gray-900, #1e293b)', color: 'white', padding: '60px 20px 20px', marginTop: '60px', borderRadius: '16px 16px 0 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px', color: 'var(--primary-color, #6366f1)' }}>Premium PG Management</h3>
          <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
            Providing the best living experience for students and professionals. State-of-the-art facilities, secure environment, and excellent community.
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>About Us</a></li>
            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Our Hostels</a></li>
            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Amenities</a></li>
            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact Support</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>Contact Info</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#94a3b8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={18} color="var(--primary-color, #6366f1)" />
              <span>123 University Road, Education City</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={18} color="var(--primary-color, #6366f1)" />
              <span>+91 98765 43210</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={18} color="var(--primary-color, #6366f1)" />
              <span>support@premiumpg.com</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '40px auto 0', maxWidth: '1200px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <p style={{ color: '#64748b', margin: 0 }}>© 2026 Premium PG Management. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="#" style={{ color: '#94a3b8' }}><Facebook size={20} /></a>
          <a href="#" style={{ color: '#94a3b8' }}><Twitter size={20} /></a>
          <a href="#" style={{ color: '#94a3b8' }}><Instagram size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
