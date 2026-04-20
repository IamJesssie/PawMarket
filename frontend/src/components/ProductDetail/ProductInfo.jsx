import React from 'react';
import styles from './ProductInfo.module.css';

const ProductInfo = ({ product }) => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {[1, 2, 3, 4].map(s => (
                <img key={s} src="/images/star-filled.svg" alt="" className={styles.starIcon} />
              ))}
              <img src="/images/star-half.svg" alt="" className={styles.starIcon} />
            </div>
            <span className={styles.ratingValue}>({product.rating}/5)</span>
          </div>
        </div>
        <span className={styles.skuText}>SKU: {product.sku}</span>
      </div>

      <div className={styles.statusRow}>
        <div className={styles.reviewsLink}>{product.reviewsCount} Reviews</div>
        <div className={styles.divider}></div>
        <div className={styles.stockStatus}>
          <img src="/images/stock-check.svg" alt="" className={styles.stockIcon} />
          <span className={styles.stockText}>{product.stockStatus}</span>
        </div>
      </div>

      <div className={styles.priceContainer}>
        <span className={styles.currentPrice}>₱{product.price.toLocaleString()}.00</span>
        <span className={styles.oldPrice}>₱{product.oldPrice.toLocaleString()}.00</span>
        <div className={styles.discountBadge}>{product.discount}</div>
      </div>

      <p className={styles.shortDescription}>{product.description}</p>
    </div>
  );
};

export default ProductInfo;
