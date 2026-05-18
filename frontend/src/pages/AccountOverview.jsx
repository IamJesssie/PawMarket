import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import styles from './AccountOverview.module.css';
import AccountSidebar from '../components/Overview/AccountSidebar';
import UserInfoSummary from '../components/Overview/UserInfoSummary';
import MetricsRow from '../components/Overview/MetricsRow';
import RecentOrders from '../components/Overview/RecentOrders';
import UpcomingAppointments from '../components/Overview/UpcomingAppointments';

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

// Helper function to prevent Supabase from hanging forever
const withTimeout = (promise, ms = 5000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Supabase request timed out')), ms))
  ]);
};

const AccountOverview = () => {
  const { user: authUser, profile, loading: authLoading } = useAuth();
  const [metrics, setMetrics] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchAccountData = async () => {
      if (!authUser?.id) {
        if (isMounted) setLoadingData(false);
        return;
      }

      try {
        if (isMounted) setLoadingData(true);

        // Fetch Metrics with Timeout
        const orderCountPromise = supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', authUser.id);
        
        const appointmentCountPromise = supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', authUser.id);

        const [orderResult, appointmentResult] = await Promise.all([
          withTimeout(orderCountPromise),
          withTimeout(appointmentCountPromise)
        ]);

        if (isMounted) {
          setMetrics([
            { label: 'Total Orders', value: orderResult?.count?.toString() || '0' },
            { label: 'Pending Orders', value: '0' },
            { label: 'Appointments', value: appointmentResult?.count?.toString() || '0' },
            { label: 'Loyalty Points', value: '0', highlight: true },
          ]);
        }

        // Fetch Recent Orders
        const ordersPromise = supabase
          .from('orders')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false })
          .limit(3);

        const ordersResult = await withTimeout(ordersPromise);

        if (isMounted) {
          setRecentOrders(ordersResult?.data?.map(o => ({
              id: `#PM-${o.id}`,
              date: new Date(o.created_at).toLocaleDateString(),
              items: 'View items',
              total: `₱${o.total.toLocaleString()}`,
              status: o.status
          })) || []);
        }

        // Fetch Appointments
        const appointmentsPromise = supabase
          .from('appointments')
          .select('*, grooming_services(name)')
          .eq('user_id', authUser.id)
          .order('appointment_date', { ascending: true })
          .limit(1);

        const appointmentsResult = await withTimeout(appointmentsPromise);

        if (isMounted) {
          setUpcomingAppointments(appointmentsResult?.data?.map(a => ({
              month: new Date(a.appointment_date).toLocaleString('default', { month: 'short' }),
              date: new Date(a.appointment_date).getDate().toString(),
              service: a.grooming_services?.name || 'Grooming',
              pet: `${a.pet_name} (${a.breed})`,
              time: a.appointment_time,
              status: a.status
          })) || []);
        }

      } catch (error) {
        console.error('Error fetching account data:', error);
      } finally {
        if (isMounted) setLoadingData(false);
      }
    };

    fetchAccountData();
    
    return () => {
      isMounted = false;
    };
  }, [authUser?.id]); // Only re-run if ID changes

  if (authLoading || loadingData) return <div className={styles.pageContainer}>Loading profile...</div>;
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
            <h1 className={styles.pageTitle}>Overview</h1>
          </div>

          <UserInfoSummary user={profile} />
          <MetricsRow metrics={metrics} />
          <RecentOrders orders={recentOrders} />
          <UpcomingAppointments appointments={upcomingAppointments} />
        </main>
      </div>
    </div>
  );
};

export default AccountOverview;
