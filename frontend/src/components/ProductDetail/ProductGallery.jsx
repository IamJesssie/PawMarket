import React, { useState } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import styles from './ProductGallery.module.css';

const ProductGallery = ({ product }) => {
  const { images, name: productName } = product;
  const [mainImage, setMainImage] = useState(images[0]);
  const { addToWishlist, isInWishlist } = useWishlist();

  const handleWishlistClick = () => {
    addToWishlist(product);
    alert(`${productName} has been added to your wishlist!`);
  };

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
        <button 
            className={styles.actionButton}
            onClick={handleWishlistClick}
            style={{ color: isInWishlist(product.id) ? '#fa782d' : '#585894' }}
        >
          <img src="/images/account/wishlist.svg" alt="" className={styles.actionIcon} />
          <span>{isInWishlist(product.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
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
