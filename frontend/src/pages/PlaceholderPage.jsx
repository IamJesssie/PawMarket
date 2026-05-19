import React from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './RecentlyViewed.module.css';
import AccountSidebar from '../components/Overview/AccountSidebar';

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

const PlaceholderPage = ({ title }) => {
  const { profile, loading: authLoading } = useAuth();

  if (authLoading) return <div className={styles.pageContainer}>Loading profile...</div>;
  if (!profile) return <div className={styles.pageContainer}>Please log in to view this page.</div>;

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
            <h1 className={styles.pageTitle}>{title}</h1>
          </div>

          <div className={styles.emptyState} style={{ backgroundColor: 'white', padding: '60px', borderRadius: '32px', border: '1px solid #e4e3db' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</div>
            <h2 style={{ color: '#585894', marginBottom: '12px' }}>Under Construction</h2>
            <p style={{ color: '#006a63', maxWidth: '400px', margin: '0 auto' }}>
              The <strong>{title}</strong> feature is currently being developed and will be available in the next release.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlaceholderPage;