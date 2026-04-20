import React, { useState } from 'react';
import styles from './ProductGallery.module.css';

const ProductGallery = ({ images, productName }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.mainImageWrapper}>
        <img src={mainImage} alt={productName} className={styles.mainImage} />
      </div>
      <div className={styles.thumbnailList}>
        {images.map((img, index) => (
          <button 
            key={index} 
            className={`${styles.thumbnailButton} ${mainImage === img ? styles.thumbnailActive : ''}`}
            onClick={() => setMainImage(img)}
          >
            <img src={img} alt={`Thumbnail ${index}`} className={styles.thumbnailImg} />
          </button>
        ))}
      </div>
      <div className={styles.galleryActions}>
        <button className={styles.actionButton}>
          <img src="/images/wishlist-icon.svg" alt="" className={styles.actionIcon} />
          <span>Add to Wishlist</span>
        </button>
        <button className={styles.actionButton}>
          <img src="/images/share-icon.svg" alt="" className={styles.actionIcon} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;
