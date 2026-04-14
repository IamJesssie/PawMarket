import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../pages/AccountOverview.module.css';

const AccountSidebar = ({ user, sidebarItems, sidebarRoutes }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarProfile}>
        <img className={styles.avatar} src={user.avatarUrl} alt={user.fullName} />
        <div className={styles.profileName}>{user.fullName}</div>
        <div className={styles.profileSubtitle}>Member since {user.memberSince}</div>
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
  );
};

export default AccountSidebar;