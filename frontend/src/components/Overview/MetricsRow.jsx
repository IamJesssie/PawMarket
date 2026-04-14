import React from 'react';
import styles from '../../pages/AccountOverview.module.css';

const MetricsRow = ({ metrics }) => {
  return (
    <section className={styles.metricsRow}>
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={`${styles.metricCard} ${metric.highlight ? styles.metricHighlight : ''}`}
        >
          <div className={styles.metricLabel}>{metric.label}</div>
          <div className={styles.metricValue}>{metric.value}</div>
        </div>
      ))}
    </section>
  );
};

export default MetricsRow;