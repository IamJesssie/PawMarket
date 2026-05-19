import React, { useState } from 'react';
import styles from './ProductTabs.module.css';

import ReviewSection from './ReviewSection';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.tabsHeader}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'description' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'specifications' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('specifications')}
        >
          Specifications
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'related' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('related')}
        >
          Related
        </button>
      </div>
      <div className={styles.tabContent}>
        {activeTab === 'description' && (
          <div className={styles.descriptionContent}>
            <p className={styles.longDesc}>{product.longDescription}</p>
            <ul className={styles.featureList}>
              {product.features?.map((feature, i) => (
                <li key={i} className={styles.featureItem}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'reviews' && (
          <ReviewSection productId={product.id} />
        )}
        {activeTab !== 'description' && activeTab !== 'reviews' && (
          <div className={styles.placeholderTab}>
            Content for {activeTab} will be available soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
