import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './RecentlyViewed.module.css';
import AccountSidebar from '../components/Overview/AccountSidebar';
import { products } from '../data/products';

const avatarUrl = 'https://www.figma.com/api/mcp/asset/4f7cd715-1f04-4a73-89f7-5c766ee5c8d0';

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

const user = {
  fullName: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '+63 912 345 6789',
  avatarUrl: avatarUrl,
  memberSince: '2024'
};

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    // Get IDs from localStorage
    const viewedData = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    
    // Map the IDs/Stale items to the fresh data in products.js
    const freshRecentProducts = viewedData.map(staleItem => {
      return products.find(p => p.id === staleItem.id) || staleItem;
    }).filter(p => p !== undefined);

    setRecentProducts(freshRecentProducts);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.accountShell}>
        <AccountSidebar 
          user={user} 
          sidebarItems={sidebarItems} 
          sidebarIcons={sidebarIcons}
          sidebarRoutes={sidebarRoutes} 
        />

        <main className={styles.contentArea}>
          <div className={styles.pageHeadingRow}>
            <h1 className={styles.pageTitle}>Recently Viewed Products</h1>
          </div>

          {recentProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {recentProducts.map(product => (
                <div key={product.id} className={styles.productCard}>
                  <Link to={`/products/${product.id}`} className={styles.imageLink}>
                    <div 
                      className={styles.imageWrapper}
                      style={{ 
                        backgroundImage: `url(${product.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {/* Using background image to match the high-fi design pattern */}
                    </div>
                  </Link>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productPrice}>₱{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    <Link to={`/products/${product.id}`} className={styles.viewDetailsBtn}>
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>You haven't viewed any products yet.</p>
              <Link to="/products" className={styles.shopNowButton}>Start Shopping</Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RecentlyViewed;
