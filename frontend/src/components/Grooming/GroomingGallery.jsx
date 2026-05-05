import React from 'react';
import { MOCK_TRANSFORMATIONS } from '../../data/mockData';
import BeforeAfterSlider from './BeforeAfterSlider';
import styles from './GroomingGallery.module.css';

const GroomingGallery = () => {
  return (
    <section className={styles.gallerySection}>
      <div className={styles.header}>
        <span className={styles.label}>Results</span>
        <h2 className={styles.title}>Our Recent Transformations</h2>
        <p className={styles.subtitle}>See the amazing results of our professional grooming services.</p>
      </div>

      <div className={styles.grid}>
        {MOCK_TRANSFORMATIONS.map(item => (
          <BeforeAfterSlider 
            key={item.id}
            before={item.beforeImage}
            after={item.afterImage}
            petName={item.petName}
            breed={item.breed}
          />
        ))}
      </div>
    </section>
  );
};

export default GroomingGallery;
