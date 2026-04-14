import styles from './GroomingComponents.module.css';

const weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CalendarPicker = ({ monthLabel, days, selectedDate, onSelectDate, onPrevMonth, onNextMonth }) => {
  return (
    <div className={styles.calendarPanel}>
      <div className={styles.calendarHeader}>
        <button type="button" className={styles.calendarNavButton} onClick={onPrevMonth}>
          ←
        </button>
        <p className={styles.calendarMonth}>{monthLabel}</p>
        <button type="button" className={styles.calendarNavButton} onClick={onNextMonth}>
          →
        </button>
      </div>

      <div className={styles.weekdayRow}>
        {weekdayLabels.map((label) => (
          <span key={label} className={styles.weekdayLabel}>{label}</span>
        ))}
      </div>

      <div className={styles.dayGrid}>
        {days.map((day) => (
          <button
            key={day.key}
            type="button"
            className={`${styles.calendarDay} ${day.isSelected ? styles.calendarDaySelected : ''} ${day.disabled ? styles.calendarDayDisabled : ''}`}
            onClick={() => !day.disabled && onSelectDate(day.date)}
            disabled={day.disabled}
          >
            <span>{day.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarPicker;
