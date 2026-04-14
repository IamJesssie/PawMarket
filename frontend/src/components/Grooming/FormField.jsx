import styles from './GroomingComponents.module.css';

const FormField = ({ label, name, value, placeholder, onChange, type = 'text', required = false }) => {
  return (
    <label htmlFor={name} className={styles.fieldGroup}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.textInput}
      />
    </label>
  );
};

export default FormField;
