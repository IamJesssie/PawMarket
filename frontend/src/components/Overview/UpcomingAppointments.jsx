import React from 'react';
import styles from '../../pages/AccountOverview.module.css';

const UpcomingAppointments = ({ appointments, onBookNew, onView }) => {
  return (
    <section className={styles.panelCard}>
      <div className={styles.panelHeader}>
        <h2>Upcoming Appointments</h2>
        <button className={styles.outlineButton} onClick={onBookNew}>Book New</button>
      </div>

      {appointments.map((appointment) => (
        <div key={appointment.id || appointment.date} className={styles.appointmentRow}>
          <div className={styles.appointmentBadge}>
            <span className={styles.appointmentMonth}>{appointment.month}</span>
            <span className={styles.appointmentDate}>{appointment.date}</span>
          </div>
          <div className={styles.appointmentDetails}>
            <div className={styles.appointmentTitle}>{appointment.service}</div>
            <div className={styles.appointmentMeta}>Pet: {appointment.pet}</div>
            <div className={styles.appointmentMeta}>Time: {appointment.time}</div>
          </div>
          <div className={styles.appointmentActions}>
            <span className={styles.appointmentStatus}>{appointment.status}</span>
            <button className={styles.linkButton} onClick={() => onView(appointment.id)}>View Details</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default UpcomingAppointments;