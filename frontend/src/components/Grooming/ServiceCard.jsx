import styles from './GroomingComponents.module.css';

const ServiceCard = ({ service, selected, onSelect }) => {
  return (
    <button
      type="button"
      className={`${styles.card} ${selected ? styles.active : ''}`}
      onClick={() => onSelect(service.id)}
    >
      <div className={styles.cardHeader}>
        <div className={styles.radioWrapper}>
          <span className={styles.radio}>{selected && <span className={styles.radioSelected} />}</span>
          <div>
            <h3 className={styles.cardTitle}>{service.name}</h3>
            <p className={styles.cardSubtitle}>{service.duration}</p>
          </div>
        </div>
        <p className={styles.cardPrice}>₱{service.price}</p>
      </div>
    </button>
  );
};

export default ServiceCard;
