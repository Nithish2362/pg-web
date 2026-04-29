import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { User, Phone, Mail, MapPin, Building, Calendar, Hash } from 'lucide-react';
import './History.css';

const TenantDetails = () => {
  const { data } = useOutletContext();
  
  if (!data) return <div className="animate-fade-in text-muted p-8">No profile data available.</div>;

  const profileItems = [
    { label: 'Full Name', value: data.studentName, icon: <User size={20} /> },
    { label: 'PG Number', value: data.pgNumber, icon: <Hash size={20} /> },
    { label: 'Contact', value: data.studentPhone, icon: <Phone size={20} /> },
    { label: 'Emergency Contact', value: data.parentPhone, icon: <Phone size={20} /> },
    { label: 'Building', value: data.buildingName, icon: <Building size={20} /> },
    { label: 'Joining Date', value: data.joiningDate, icon: <Calendar size={20} /> },
    { label: 'Monthly Rent', value: `₹${data.monthlyRent}`, icon: <MapPin size={20} /> },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="section-title">
        <User size={22} className="text-primary" />
        My Profile
      </h2>
      
      <div className="details-grid">
        {profileItems.map((item, i) => (
          <div key={i} className="premium-card detail-item">
            <div className="detail-icon-box">
              {item.icon}
            </div>
            <div>
              <div className="detail-label">{item.label}</div>
              <div className="detail-value">{item.value || 'N/A'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantDetails;
