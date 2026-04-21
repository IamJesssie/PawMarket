import React from 'react';
import styles from './TrustBadges.module.css';

const TrustBadges = () => {
  return (
    <div className={styles.trustBadges}>
      <div className={styles.trustItem}>
        <img src="/images/cart-shipping.svg" alt="" className={styles.trustIcon} />
        <span>Free shipping over ₱5,000</span>
      </div>
      <div className={styles.trustItem}>
        <img src="/images/cart-returns.svg" alt="" className={styles.trustIcon} />
        <span>30-day returns</span>
      </div>
      <div className={styles.trustItem}>
        <img src="/images/cart-secure.svg" alt="" className={styles.trustIcon} />
        <span>Secure checkout</span>
      </div>
    </div>
  );
};

export default TrustBadges;
