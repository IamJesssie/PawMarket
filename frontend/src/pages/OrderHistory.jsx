import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
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

const OrderHistory = () => {
  const { profile, loading: authLoading } = useAuth();
  const { orders } = useOrder();
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  if (authLoading) return <div className={styles.pageContainer}>Loading profile...</div>;
  if (!profile) return <div className={styles.pageContainer}>Please log in to view your orders.</div>;

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
            <h1 className={styles.pageTitle}>Order History</h1>
          </div>

          {orders.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.map(order => (
                <div key={order.id} style={{ 
                    backgroundColor: 'white', 
                    padding: '24px', 
                    borderRadius: '24px', 
                    border: '1px solid #e4e3db',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '700', color: '#585894' }}>Order #PM-{order.id}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div style={{ fontSize: '14px', marginTop: '8px' }}>Total: ₱{order.total.toLocaleString()}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '99px', 
                        fontSize: '12px', 
                        fontWeight: '700',
                        backgroundColor: order.status.includes('shipped') || order.status.includes('Created') ? '#fff3e0' : '#e8f5e9',
                        color: order.status.includes('shipped') || order.status.includes('Created') ? '#fa782d' : '#006a63'
                    }}>
                        {order.status}
                    </span>
                    <button 
                        onClick={() => setSelectedOrderId(`#PM-${order.id}`)}
                        style={{ 
                            border: 'none', 
                            background: 'none', 
                            color: '#006a63', 
                            fontWeight: '700', 
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>You haven't placed any orders yet.</p>
              <Link to="/products" className={styles.shopNowButton}>Start Shopping</Link>
            </div>
          )}
        </main>
      </div>

      {selectedOrderId && (
        <OrderStatus 
          orderId={selectedOrderId} 
          onClose={() => setSelectedOrderId(null)} 
        />
      )}
    </div>
  );
};

export default OrderHistory;