import React from 'react';
import styles from './AccountOverview.module.css';
import AccountSidebar from '../components/Overview/AccountSidebar';
import UserInfoSummary from '../components/Overview/UserInfoSummary';
import MetricsRow from '../components/Overview/MetricsRow';
import RecentOrders from '../components/Overview/RecentOrders';
import UpcomingAppointments from '../components/Overview/UpcomingAppointments';

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

const sidebarRoutes = {
  Overview: '/dashboard',
  Addresses: '/dashboard/addresses',
};

const user = {
  fullName: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '+63 912 345 6789',
  avatarUrl: avatarUrl,
  memberSince: '2024'
};

const metrics = [
  { label: 'Total Orders', value: '12' },
  { label: 'Pending Orders', value: '2' },
  { label: 'Appointments', value: '3' },
  { label: 'Loyalty Points', value: '480', highlight: true },
];

const recentOrders = [
  { id: '#PM-1042', date: 'Mar 08, 2026', items: '3 item(s)', total: '₱2694.45', status: 'Delivered' },
  { id: '#PM-1039', date: 'Feb 25, 2026', items: '1 item(s)', total: '₱1210.00', status: 'Delivered' },
  { id: '#PM-1031', date: 'Feb 10, 2026', items: '5 item(s)', total: '₱5032.50', status: 'Delivered' },
];

const upcomingAppointments = [
  {
    month: 'Mar',
    date: '15',
    service: 'Full Grooming',
    pet: 'Buddy (Golden Retriever)',
    time: '10:00 AM',
    status: 'Confirmed',
  },
];

const AccountOverview = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.accountShell}>
        <AccountSidebar 
          user={user} 
          sidebarItems={sidebarItems} 
          sidebarRoutes={sidebarRoutes} 
        />

        <main className={styles.contentArea}>
          <div className={styles.pageHeadingRow}>
            <h1 className={styles.pageTitle}>Overview</h1>
          </div>

          <UserInfoSummary user={user} />
          <MetricsRow metrics={metrics} />
          <RecentOrders orders={recentOrders} />
          <UpcomingAppointments appointments={upcomingAppointments} />
        </main>
      </div>
    </div>
  );
};

export default AccountOverview;
