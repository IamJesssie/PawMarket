import React from 'react';
import styles from './LoyaltyPointsBar.module.css';

const LoyaltyPointsBar = ({ points, discount }) => {
  const pointsToNextReward = (2 - (points % 2)) || 2;

  return (
    <div className={styles.loyaltyBar}>
      <div className={styles.container}>
        <div className={styles.pointsInfo}>
          <div className={styles.pointsDisplay}>
            <span className={styles.label}>Loyalty Points</span>
            <span className={styles.points}>{points}</span>
          </div>
        </div>

        <div className={styles.rewardInfo}>
          <div className={styles.rewardItem}>
            <span className={styles.rewardLabel}>Next Reward in</span>
            <span className={styles.rewardValue}>{pointsToNextReward} points</span>
          </div>
          <div className={styles.rewardItem}>
            <span className={styles.rewardLabel}>Available Discount</span>
            <span className={styles.rewardValue}>₱{discount}</span>
          </div>
        </div>

        <div className={styles.infoText}>
          <span>💡 2 points = ₱10 off voucher</span>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPointsBar;
