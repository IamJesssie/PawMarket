import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './RecentlyViewed.module.css'; // Reusing styles for consistency
import AccountSidebar from '../components/Overview/AccountSidebar';
import { useWishlist } from '../context/WishlistContext';

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

const Wishlist = () => {
  const { profile, loading: authLoading } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();

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
          <div className={styles.pageHeadingRow}>
            <h1 className={styles.pageTitle}>My Wishlist & Saved</h1>
          </div>

          {wishlistItems.length > 0 ? (
            <div className={styles.productGrid}>
              {wishlistItems.map(product => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.imageWrapper}>
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productPrice}>₱{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Link to={`/products/${product.id}`} className={styles.viewDetailsBtn} style={{ flex: 1 }}>
                        View
                        </Link>
                        <button 
                            onClick={() => removeFromWishlist(product.id)}
                            className={styles.viewDetailsBtn} 
                            style={{ flex: 1, backgroundColor: '#585894' }}
                        >
                        Remove
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Your wishlist is empty.</p>
              <Link to="/products" className={styles.shopNowButton}>Start Shopping</Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Wishlist;
