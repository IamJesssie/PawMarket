import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
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

const RecentlyViewed = () => {
  const { user, profile, isAuthenticated, loading: authLoading } = useAuth();
  const [recentProducts, setRecentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      let productIds = [];

      if (isAuthenticated && user?.id) {
        try {
          const { data, error } = await supabase
            .from('recently_viewed')
            .select('product_id')
            .eq('user_id', user.id)
            .order('viewed_at', { ascending: false })
            .limit(10);

          if (!error && data) {
            productIds = data.map(item => item.product_id);
          }
        } catch (err) {
          console.error("Error fetching recently viewed:", err);
        }
      } else {
        // Fallback to local storage if not logged in
        const viewedData = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        productIds = viewedData.map(item => item.id);
      }

      if (productIds.length > 0) {
        try {
          const response = await fetch('http://localhost:8080/api/products');
          if (response.ok) {
            const allProducts = await response.json();
            // Map backend data to frontend format and filter by recently viewed
            const freshRecentProducts = productIds.map(id => {
              const p = allProducts.find(prod => prod.id === id);
              if (p) {
                return {
                  ...p,
                  image: p.imageUrl,
                  sizes: ['1 kg', '2 kg', '5 kg', '10 kg', '15 kg'],
                  flavors: ['Chicken', 'Beef', 'Salmon', 'Lamb'],
                  images: [p.imageUrl, p.imageUrl, p.imageUrl, p.imageUrl]
                };
              }
              return undefined;
            }).filter(p => p !== undefined);

            setRecentProducts(freshRecentProducts);
          }
        } catch (err) {
          console.error("Failed to fetch products from backend", err);
        }
      }
      setIsLoading(false);
    };

    fetchRecentlyViewed();
  }, [user?.id, isAuthenticated]);

  if (authLoading || isLoading) return <div className={styles.pageContainer}>Loading profile...</div>;
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
