import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './RecentlyViewed.module.css'; // Reusing layout styles
import AccountSidebar from '../components/Overview/AccountSidebar';
import OrderStatus from '../components/ShoppingCart/OrderStatus';

const sidebarItems = [
  'Overview',
  'Order History',
  'Appointments',
  'Wishlist & Saved',
  'Recently Viewed',
  'Profile',
  'Addresses',
  'Password & Security',
  'Notifications',
  'Payment Methods',
  'My Pets',
  'Logout',
];

const sidebarIcons = {
  'Overview': '/images/account/overview.svg',
  'Order History': '/images/account/orders.svg',
  'Appointments': '/images/account/appointments.svg',
  'Wishlist & Saved': '/images/account/wishlist.svg',
  'Recently Viewed': '/images/account/recent.svg',
  'Profile': '/images/account/profile.svg',
  'Addresses': '/images/account/addresses.svg',
  'Password & Security': '/images/account/security.svg',
  'Notifications': '/images/account/notifications.svg',
  'Payment Methods': '/images/account/payments.svg',
  'My Pets': '/images/account/pets.svg',
  'Logout': '/images/account/logout.svg',
};

const sidebarRoutes = {
  'Overview': '/dashboard',
  'Order History': '/dashboard/orders',
  'Appointments': '/dashboard/appointments',
  'Wishlist & Saved': '/wishlist',
  'Recently Viewed': '/recently-viewed',
  'Addresses': '/dashboard/addresses',
  'Profile': '/dashboard/profile',
  'Password & Security': '/dashboard/security',
  'Notifications': '/dashboard/notifications',
  'Payment Methods': '/dashboard/payments',
  'My Pets': '/dashboard/pets',
};

const AppointmentList = () => {
  const { user, profile, isAuthenticated, loading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAptId, setSelectedAptId] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const response = await fetch(`http://localhost:8080/api/appointments/user/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setAppointments(data);
          }
        } catch (err) {
          console.error("Failed to fetch appointments", err);
        }
      }
      setLoading(false);
    };

    fetchAppointments();
  }, [user?.id, isAuthenticated]);

  if (authLoading || loading) return <div className={styles.pageContainer}>Loading profile...</div>;
  if (!profile) return <div className={styles.pageContainer}>Please log in to view your appointments.</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.accountShell}>
        <AccountSidebar 
          user={profile} 
          sidebarItems={sidebarItems} 
          sidebarIcons={sidebarIcons}
          sidebarRoutes={sidebarRoutes} 
        />

        <main className={styles.contentArea}>
          <div className={styles.pageHeadingRow}>
            <h1 className={styles.pageTitle}>Grooming Appointments</h1>
          </div>

          {appointments.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {appointments.map(apt => (
                <div key={apt.id} style={{ 
                    backgroundColor: 'white', 
                    padding: '24px', 
                    borderRadius: '32px', 
                    border: '1px solid #e4e3db',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                  <div style={{ 
                      position: 'absolute', 
                      top: '0', 
                      left: '0', 
                      width: '4px', 
                      height: '100%', 
                      backgroundColor: '#fa782d' 
                  }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#fa782d', textTransform: 'uppercase' }}>
                        {apt.petType} Grooming
                    </span>
                    <span style={{ fontSize: '12px', color: '#666' }}>#APT-{apt.id}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', color: '#585894', marginBottom: '8px' }}>{apt.petName}</h3>
                  <p style={{ fontSize: '14px', color: '#006a63', marginBottom: '4px' }}>
                    📅 {new Date(apt.appointmentDate).toLocaleDateString()}
                  </p>
                  <p style={{ fontSize: '14px', color: '#006a63', marginBottom: '16px' }}>
                    🕒 {apt.appointmentTime}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '99px', 
                        fontSize: '12px', 
                        fontWeight: '700',
                        backgroundColor: apt.status === 'Confirmed' ? '#e8f5e9' : '#fff3e0',
                        color: apt.status === 'Confirmed' ? '#006a63' : '#fa782d'
                    }}>
                        {apt.status}
                    </span>
                    <button 
                        onClick={() => setSelectedAptId(apt.id)}
                        style={{ border: 'none', background: 'none', color: '#006a63', fontWeight: '700', cursor: 'pointer' }}
                    >
                        Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No upcoming appointments found.</p>
              <button 
                  onClick={() => window.location.href='/grooming'} 
                  className={styles.shopNowButton}
              >
                  Book New Session
              </button>
            </div>
          )}
        </main>
      </div>

      {selectedAptId && (
        <OrderStatus 
          orderId={`#APT-${selectedAptId}`} 
          onClose={() => setSelectedAptId(null)} 
        />
      )}
    </div>
  );
};

export default AppointmentList;