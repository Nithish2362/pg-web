import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bed, Users, Wifi, AirVent, Shield, Coffee } from 'lucide-react';
import Footer from '../components/Footer';

// Use standard React imports for the images that we generated and placed in assets
import studentsImg from '../assets/students_books.png';
import canteenImg from '../assets/canteen_building.png';

// Simulated API function for generating hostel room data
const fetchHostelData = (page, count) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startId = page * count;
      const newItems = Array.from({ length: count }).map((_, idx) => {
        const id = startId + idx;
        const totalBeds = Math.floor(Math.random() * 4) + 1;
        const occupiedBeds = Math.floor(Math.random() * (totalBeds + 1));
        const isAC = Math.random() > 0.5;
        const isPremium = Math.random() > 0.8;
        
        return {
          id: `RM-${100 + id}`,
          roomNumber: `${Math.floor(id / 10) + 1}0${(id % 10) + 1}`,
          type: totalBeds === 1 ? 'Single' : totalBeds === 2 ? 'Double' : 'Shared',
          totalBeds,
          occupiedBeds,
          isAC,
          isPremium,
          price: isPremium ? 12000 : 8000 + (totalBeds * 500) + (isAC ? 2000 : 0),
          status: occupiedBeds === totalBeds ? 'Full' : occupiedBeds === 0 ? 'Empty' : 'Available',
          lastCleaned: `${Math.floor(Math.random() * 5) + 1} days ago`,
          tenants: Array.from({ length: occupiedBeds }).map((_, tIdx) => `Tenant ${tIdx + 1}`)
        };
      });
      resolve(newItems);
    }, 800); // simulate network latency
  });
};

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const loadMoreData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const newRooms = await fetchHostelData(page, 12);
    if (newRooms.length === 0) {
      setHasMore(false);
    } else {
      setRooms(prev => [...prev, ...newRooms]);
      setPage(prev => prev + 1);
    }
    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    loadMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastRoomElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreData();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Full': return 'var(--danger-color, #ef4444)';
      case 'Available': return 'var(--warning-color, #f59e0b)';
      case 'Empty': return 'var(--success-color, #10b981)';
      default: return '#888';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Hero Section with Students Image */}
      <div style={{ position: 'relative', height: '60vh', minHeight: '400px', overflow: 'hidden', borderRadius: '16px', marginBottom: '40px' }}>
        <img src={studentsImg} alt="Students with Books" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2))', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px' }}>
          <h1 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 'bold', margin: '0 0 16px', maxWidth: '800px', lineHeight: '1.2' }}>
            Premium PG Management
          </h1>
          <p style={{ color: '#e2e8f0', fontSize: '1.2rem', maxWidth: '600px', lineHeight: '1.6' }}>
            Empowering students with a comfortable, secure, and modern living experience. Your home away from home.
          </p>
        </div>
      </div>

      {/* Middle Section with Canteen Building Image */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', marginBottom: '60px', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ flex: '1 1 400px', padding: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px', color: 'white' }}>World-Class Canteen</h2>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: '1.7', marginBottom: '24px' }}>
            Experience hygienic, delicious, and nutritious meals prepared by top chefs. Our modern canteen building offers a vibrant atmosphere for students to relax, dine, and socialize.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', color: 'white' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-color, #6366f1)' }}></div> 
              24/7 Snack Bar & Café
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-color, #6366f1)' }}></div> 
              Healthy Menu Options
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-color, #6366f1)' }}></div> 
              Spacious Seating Areas
            </li>
          </ul>
        </div>
        <div style={{ flex: '1 1 400px', height: '100%', minHeight: '400px' }}>
          <img src={canteenImg} alt="Canteen Building" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Bottom Section: Infinite Scroll Rooms List */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Available Hostels & Rooms</h2>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '24px' 
      }}>
        {rooms.map((room, index) => {
          const isLast = rooms.length === index + 1;
          return (
            <div 
              ref={isLast ? lastRoomElementRef : null}
              key={room.id}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px -10px rgba(0,0,0,0.5)';
                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {room.roomNumber}
                    {room.isPremium && <span style={{ fontSize: '0.7rem', background: '#eab308', color: 'black', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>PREMIUM</span>}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>{room.type} Room</div>
                </div>
                <div style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  padding: '6px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: '600',
                  color: getStatusColor(room.status),
                  border: `1px solid ${getStatusColor(room.status)}40`
                }}>
                  {room.status}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8' }}>
                  <Users size={16} />
                  <span>{room.occupiedBeds}/{room.totalBeds} Occupied</span>
                </div>
                <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8' }}>
                  <AirVent size={16} color={room.isAC ? '#60a5fa' : 'inherit'} />
                  <span>{room.isAC ? 'AC' : 'Non-AC'}</span>
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.2)', height: '8px', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
                <div style={{ 
                  width: `${(room.occupiedBeds / room.totalBeds) * 100}%`, 
                  height: '100%', 
                  background: getStatusColor(room.status),
                  transition: 'width 0.5s ease-in-out'
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-color, #818cf8)' }}>
                  ₹{room.price.toLocaleString()}<span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'normal' }}>/mo</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', color: '#94a3b8' }}>
                  <Wifi size={16} />
                  <Shield size={16} />
                  {room.isPremium && <Coffee size={16} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary-color)' }}>
            <div className="animate-spin" style={{ width: '24px', height: '24px', border: '3px solid transparent', borderTopColor: 'currentColor', borderRadius: '50%' }}></div>
            <span>Loading more rooms...</span>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <Footer />

    </div>
  );
};

export default Home;
