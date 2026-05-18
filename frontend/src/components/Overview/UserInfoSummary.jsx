import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../pages/AccountOverview.module.css';

const UserInfoSummary = ({ user }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/dashboard/profile');
  };

  return (
    <section className={styles.userInfoCard}>
      <div>
        <div className={styles.sectionLabel}>User Info Summary</div>
        <div className={styles.userInfoGrid}>
          <div className={styles.userInfoLabel}>Full Name:</div>
          <div className={styles.userInfoValue}>{user.fullName}</div>
          <div className={styles.userInfoLabel}>Email:</div>
          <div className={styles.userInfoValue}>{user.email}</div>
          <div className={styles.userInfoLabel}>Phone:</div>
          <div className={styles.userInfoValue}>{user.phone}</div>
        </div>
      </div>
      <button className={styles.outlineButton} onClick={handleEditProfile}>
        Edit Profile
      </button>
    </section>
  );
};

export default UserInfoSummary;