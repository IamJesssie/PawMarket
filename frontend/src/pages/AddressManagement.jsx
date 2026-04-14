import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './AddressManagement.module.css';

const avatarUrl = 'https://www.figma.com/api/mcp/asset/4f7cd715-1f04-4a73-89f7-5c766ee5c8d0';

const sidebarItems = [
  'Overview',
  'Order History',
  'Appointments',
  'Wishlist',
  'Profile',
  'Addresses',
  'Password & Security',
  'Notifications',
  'Payment Methods',
  'My Pets',
  'Logout',
];

const navRoutes = {
  Overview: '/dashboard',
  Addresses: '/dashboard/addresses',
};

const AddressManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.accountShell}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarProfile}>
            <img className={styles.avatar} src={avatarUrl} alt="Jane Doe" />
            <div className={styles.profileName}>Jane Doe</div>
            <div className={styles.profileSubtitle}>Pet owner since 2024</div>
          </div>

          <nav className={styles.sidebarNav}>
            {sidebarItems.map((item) => {
              const isActive = navRoutes[item] ? location.pathname === navRoutes[item] : false;
              return (
                <button
                  key={item}
                  type="button"
                  className={`${styles.sidebarNavItem} ${isActive ? styles.activeNavItem : ''}`}
                  onClick={() => navRoutes[item] && navigate(navRoutes[item])}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </aside>

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
