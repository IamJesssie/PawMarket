import React from 'react';
import styles from '../../pages/AccountOverview.module.css';

const RecentOrders = ({ orders }) => {
  return (
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
            {orders.map((order) => (
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
  );
};

export default RecentOrders;