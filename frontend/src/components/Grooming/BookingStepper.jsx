import styles from './GroomingComponents.module.css';

const BookingStepper = ({ steps = [], currentStep = 1 }) => {
  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        return (
          <div
            key={step.label}
            className={`${styles.stepItem} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.stepCircle}>{stepNumber}</span>
            <span>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BookingStepper;
