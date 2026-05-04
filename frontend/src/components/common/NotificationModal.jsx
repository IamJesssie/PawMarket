import React from 'react';
import styles from './NotificationModal.module.css';

const NotificationModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.successIcon}>✓</div>
        <h3 className={styles.modalTitle}>Success!</h3>
        <p className={styles.modalMessage}>{message}</p>
        <button className={styles.closeButton} onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;