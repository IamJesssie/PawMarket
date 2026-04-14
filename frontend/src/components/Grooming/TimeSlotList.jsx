import styles from './GroomingComponents.module.css';

const TimeSlotList = ({ slots, selectedTime, onSelectTime }) => {
  return (
    <div className={styles.timeSlotPanel}>
      <p className={styles.timeSlotLabel}>Available Times</p>
      <div className={styles.timeSlotGrid}>
        {slots.map((slot) => (
          <button
            type="button"
            key={slot.value}
            className={`${styles.timeSlot} ${selectedTime === slot.value ? styles.timeSlotSelected : ''}`}
            onClick={() => !slot.disabled && onSelectTime(slot.value)}
            disabled={slot.disabled}
          >
            {slot.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotList;
