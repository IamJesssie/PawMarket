import styles from './GroomingComponents.module.css';

const SidebarDetails = ({ image, total }) => {
  return (
    <div className={styles.sidebarCard}>
      <div>
        <p className={styles.sidebarTitle}>Our Grooming Center</p>
        <img src={image} alt="Grooming center" className={styles.sidebarImage} />
      </div>

      <div className={styles.sidebarText}>
        <div className={styles.detailRow}>
          <strong className={styles.detailLabel}>Location & Hours</strong>
        </div>
        <p>123 Pet Street, Dogwood</p>
        <p>Mon - Fri: 9am - 7pm</p>
        <p>Saturday: 10am - 5pm</p>
        <p>Sunday: Closed</p>
      </div>

      <div>
        <p className={styles.sidebarTitle}>Meet Our Groomers</p>
        <div className={styles.tagList}>
          <span className={styles.pill}></span>
          <span className={styles.pill}></span>
          <span className={styles.pill}></span>
        </div>
      </div>

      <div className={styles.totalBlock}>
        <p className={styles.totalLabel}>
          Estimated Total
          <span>₱{total.toLocaleString()}</span>
        </p>
        <p className={styles.totalNote}>
          Price may vary based on pet size and coat condition.
        </p>
      </div>
    </div>
  );
};

export default SidebarDetails;
