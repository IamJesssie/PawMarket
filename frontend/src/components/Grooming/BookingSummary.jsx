import styles from './GroomingComponents.module.css';

const BookingSummary = ({ service, addons, date, time, petDetails, total }) => {
  const addonsLabel = addons.length > 0 ? addons.join(', ') : 'None';
  const formatDate = (dateValue) => {
    if (!dateValue) {
      return 'TBD';
    }

    return dateValue.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const petLabel = petDetails.petName
    ? `${petDetails.petName}${petDetails.breed ? ` (${petDetails.breed})` : ''}`
    : 'No pet selected';

  return (
    <div className={styles.confirmCard}>
      <h3 className={styles.confirmHeading}>Booking Summary</h3>

      <div className={styles.confirmGrid}>
        <div className={styles.confirmItem}>
          <span className={styles.confirmItemLabel}>Service</span>
          <span className={styles.confirmItemValue}>{service?.name || 'None'}</span>
        </div>
        <div className={styles.confirmItem}>
          <span className={styles.confirmItemLabel}>Add-ons</span>
          <span className={styles.confirmItemValue}>{addonsLabel}</span>
        </div>
        <div className={styles.confirmItem}>
          <span className={styles.confirmItemLabel}>Date</span>
          <span className={styles.confirmItemValue}>{formatDate(date)}</span>
        </div>
        <div className={styles.confirmItem}>
          <span className={styles.confirmItemLabel}>Time</span>
          <span className={styles.confirmItemValue}>{time || 'TBD'}</span>
        </div>
        <div className={styles.confirmItem}>
          <span className={styles.confirmItemLabel}>Pet</span>
          <span className={styles.confirmItemValue}>{petLabel}</span>
        </div>
        <div className={styles.confirmItem}>
          <span className={styles.confirmItemLabel}>Groomer</span>
          <span className={styles.confirmItemValue}>Any Available</span>
        </div>
      </div>

      <div className={styles.confirmTotalRow}>
        <span className={styles.confirmTotalLabel}>Total</span>
        <span className={styles.confirmTotalValue}>₱{total.toFixed(2)}</span>
      </div>

      <p className={styles.confirmSubtext}>
        Payment via saved card or new card; confirmation email will be sent.
      </p>
    </div>
  );
};

export default BookingSummary;
