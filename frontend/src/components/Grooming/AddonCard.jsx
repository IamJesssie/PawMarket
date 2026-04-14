import styles from './GroomingComponents.module.css';

const AddonCard = ({ addon, selected, onToggle }) => {
  return (
    <button
      type="button"
      className={`${styles.addonCard} ${selected ? styles.active : ''}`}
      onClick={() => onToggle(addon.id)}
    >
      <span className={styles.addonLabel}>{addon.name}</span>
      <span className={styles.addonPrice}>+₱{addon.price}</span>
    </button>
  );
};

export default AddonCard;
