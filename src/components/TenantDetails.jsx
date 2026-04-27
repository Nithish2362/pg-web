import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchProfile } from '../api/api';

const TenantDetails = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const response = await fetchProfile();
        setDetails(response.response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, []);

  const DetailItem = ({ label, value }) => (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>{value || 'N/A'}</div>
    </div>
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Loader2 className="animate-spin" size={32} color="var(--primary-color)" />
      </div>
    );
  }

  if (error) {
    return <div style={{ color: 'var(--danger-color)', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div className="animate-fade-in">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        My Details
        <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-color)', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {details.isActive ? 'Active' : 'Inactive'}
        </span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '10px' }}>Personal Information</h3>
          <DetailItem label="Full Name" value={details.studentName} />
          <DetailItem label="Email Address" value={details.email} />
          <DetailItem label="Mobile Number" value={details.mobileNumber} />
          <DetailItem label="Date of Birth" value={details.dob} />
          <DetailItem label="Permanent Address" value={details.address} />
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '24px', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '10px' }}>Stay Information</h3>
          <DetailItem label="Join Date" value={details.joinDate} />
          {details.roomInfo && (
            <>
              <DetailItem label="Assigned Room" value={details.roomInfo.roomNumber} />
              <DetailItem label="Assigned Bed" value={details.roomInfo.bedNumber} />
              <DetailItem label="Floor" value={details.roomInfo.floorName} />
              <DetailItem label="Rent" value={`$${details.roomInfo.monthlyRent}`} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantDetails;
