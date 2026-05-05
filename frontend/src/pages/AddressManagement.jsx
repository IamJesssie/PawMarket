import React from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './AddressManagement.module.css';
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
  'Wishlist & Saved': '/wishlist',
  'Recently Viewed': '/recently-viewed',
  'Addresses': '/dashboard/addresses',
};

const AddressManagement = () => {
  const { profile, loading: authLoading } = useAuth();

  if (authLoading) return <div className={styles.pageContainer}>Loading profile...</div>;
  if (!profile) return <div className={styles.pageContainer}>Please log in to view your profile.</div>;

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
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Address Management</h1>
          </div>

          <div className={styles.sectionStack}>
            <div className={`${styles.addressCard} ${styles.primaryCard}`}>
              <div className={styles.cardBody}>
                <div>
                  <div className={styles.cardLabel}>HOME / DEFAULT</div>
                  <div className={styles.cardTitle}>Jane Doe</div>
                  <div className={styles.cardText}>
                    123 Manila Ave, BGC, Taguig City, Metro Manila, 1630, Philippines
                  </div>
                  <div className={styles.cardText}>+63 912 345 6789</div>
                </div>
                <button className={styles.deleteButton}>Delete</button>
              </div>
              <span className={styles.defaultBadge}>DEFAULT</span>
            </div>

            <div className={styles.addressCardSecondary}>
              <div className={styles.cardHeaderRow}>
                <div>
                  <div className={styles.cardHeading}>ADDRESS</div>
                  <div className={styles.cardTitle}>Jane Doe</div>
                  <div className={styles.cardText}>
                    45F Corporate Tower, Ayala Ave, Makati City, Metro Manila, 1226, Philippines
                  </div>
                  <div className={styles.cardText}>+63 912 345 6789</div>
                </div>
                <div className={styles.cardActions}>
                  <button className={styles.outlineAction}>Set Default</button>
                  <button className={styles.deleteAction}>Delete</button>
                </div>
              </div>
            </div>
          </div>

          <section className={styles.formSection}>
            <div className={styles.formHeader}>
              <h2>Add New Address</h2>
            </div>
            <div className={styles.formGrid}>
              {[
                { label: 'Full Name', placeholder: 'Full Name' },
                { label: 'Phone', placeholder: 'Phone' },
                { label: 'Address Line 1', placeholder: 'Street address' },
                { label: 'Address Line 2 (Optional)', placeholder: 'Apt, Suite, etc.' },
                { label: 'City', placeholder: 'City' },
                { label: 'State / Province', placeholder: 'State' },
                { label: 'ZIP / Postal Code', placeholder: 'ZIP' },
                { label: 'Country', placeholder: 'Philippines' },
              ].map(({ label, placeholder }) => (
                <div key={label} className={styles.inputGroup}>
                  <label className={styles.inputLabel}>{label}</label>
                  <input className={styles.inputField} placeholder={placeholder} />
                </div>
              ))}
            </div>
            <div className={styles.checkboxRow}>
              <span className={styles.checkboxBox} />
              <span className={styles.checkboxLabel}>Set as default address</span>
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton}>Cancel</button>
              <button type="button" className={styles.saveButton}>Save Address</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AddressManagement;
