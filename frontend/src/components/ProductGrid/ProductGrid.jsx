import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <div className={styles.container17}>
      <div className={styles.gridContainer}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
      
      {/* Pagination component from design */}
      <div className={styles.container16}>
        <div className={`${styles.button2} ${styles.active}`}>
          <p className={styles.page1}>1</p>
        </div>
        <div className={styles.button2}>
          <p className={styles.page2}>2</p>
        </div>
        <div className={styles.button2}>
          <p className={styles.page1}>3</p>
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
