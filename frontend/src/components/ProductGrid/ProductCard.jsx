import React from 'react';
import styles from './ProductGrid.module.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className={styles.link}>
      <div className={styles.products}>
        <div 
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${product.image})` }}
        >
          <div className={styles.container}>
            <img
              src="/images/mnvybq12-866qgrd.svg"
              className={styles.icon}
              alt="Rating"
            />
            <p className={styles.productRating}>{product.rating}</p>
          </div>
        </div>
      </div>
      <div className={styles.products2}>
        <div className={styles.container2}>
          <div className={styles.text}>
            <p className={styles.productCategory}>{product.category}</p>
          </div>
          <div className={styles.heading3}>
            <p className={styles.productName}>{product.name}</p>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.text2}>
            <p className={styles.productPrice}>₱{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          <div 
            className={styles.button} 
            onClick={() => onAddToCart(product)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/images/mnvybq13-lodat7e.svg"
              className={styles.icon2}
              alt="Add to cart"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
