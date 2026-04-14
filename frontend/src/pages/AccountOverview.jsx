import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './AccountOverview.module.css';

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
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.accountShell}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarProfile}>
            <img className={styles.avatar} src={avatarUrl} alt="Jane Doe" />
            <div className={styles.profileName}>Jane Doe</div>
            <div className={styles.profileSubtitle}>Member since 2024</div>
          </div>

          <nav className={styles.sidebarNav}>
            {sidebarItems.map((item) => {
              const isActive = sidebarRoutes[item] ? location.pathname === sidebarRoutes[item] : false;
              return (
                <button
                  key={item}
                  className={`${styles.sidebarNavItem} ${isActive ? styles.activeNavItem : ''}`}
                  type="button"
                  onClick={() => sidebarRoutes[item] && navigate(sidebarRoutes[item])}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className={styles.contentArea}>
          <div className={styles.pageHeadingRow}>
            <h1 className={styles.pageTitle}>Overview</h1>
          </div>

          <section className={styles.userInfoCard}>
            <div>
              <div className={styles.sectionLabel}>User Info Summary</div>
              <div className={styles.userInfoGrid}>
                <div className={styles.userInfoLabel}>Full Name:</div>
                <div className={styles.userInfoValue}>Jane Doe</div>
                <div className={styles.userInfoLabel}>Email:</div>
                <div className={styles.userInfoValue}>jane.doe@example.com</div>
                <div className={styles.userInfoLabel}>Phone:</div>
                <div className={styles.userInfoValue}>+63 912 345 6789</div>
              </div>
            </div>
            <button className={styles.outlineButton}>Edit Profile</button>
          </section>

          <section className={styles.metricsRow}>
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className={`${styles.metricCard} ${metric.highlight ? styles.metricHighlight : ''}`}
              >
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricValue}>{metric.value}</div>
              </div>
            ))}
          </section>

          <section className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h2>Recent Orders</h2>
              <button className={styles.outlineButton}>View All</button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th className={styles.actionColumn}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.items}</td>
                      <td>{order.total}</td>
                      <td>
                        <span className={styles.statusBadge}>{order.status}</span>
                      </td>
                      <td>
                        <button className={styles.viewAction}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h2>Upcoming Appointments</h2>
              <button className={styles.outlineButton}>Book New</button>
            </div>

            {upcomingAppointments.map((appointment) => (
              <div key={appointment.date} className={styles.appointmentRow}>
                <div className={styles.appointmentBadge}>
                  <span className={styles.appointmentMonth}>{appointment.month}</span>
                  <span className={styles.appointmentDate}>{appointment.date}</span>
                </div>
                <div className={styles.appointmentDetails}>
                  <div className={styles.appointmentTitle}>{appointment.service}</div>
                  <div className={styles.appointmentMeta}>Pet: {appointment.pet}</div>
                  <div className={styles.appointmentMeta}>Time: {appointment.time}</div>
                </div>
                <div className={styles.appointmentActions}>
                  <span className={styles.appointmentStatus}>{appointment.status}</span>
                  <button className={styles.linkButton}>Reschedule</button>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default AccountOverview;
