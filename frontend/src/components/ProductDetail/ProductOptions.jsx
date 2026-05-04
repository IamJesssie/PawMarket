import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TrustBadges from './TrustBadges';
import styles from './ProductOptions.module.css';

const ProductOptions = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    onAddToCart({ ...product, quantity, selectedSize, selectedFlavor });
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    onAddToCart({ ...product, quantity, selectedSize, selectedFlavor });
    navigate('/cart');
  };

  return (
    <div className={styles.optionsContainer}>
      <div className={styles.optionsSection}>
        {/* Size Options */}
        <div className={styles.optionGroup}>
          <h3 className={styles.optionTitle}>Weight / Size</h3>
          <div className={styles.optionGrid}>
            {product.sizes.map(size => (
              <button 
                key={size}
                className={`${styles.optionButton} ${selectedSize === size ? styles.sizeActive : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Flavor Options */}
        <div className={styles.optionGroup}>
          <h3 className={styles.optionTitle}>Flavor / Variety</h3>
          <div className={styles.optionGrid}>
            {product.flavors.map(flavor => (
              <button 
                key={flavor}
                className={`${styles.optionButton} ${selectedFlavor === flavor ? styles.flavorActive : ''}`}
                onClick={() => setSelectedFlavor(flavor)}
              >
                {flavor}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.purchaseSection}>
        <h3 className={styles.optionTitle}>Purchase</h3>
        <div className={styles.purchaseControls}>
          <div className={styles.quantitySelector}>
            <button className={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span className={styles.qtyValue}>{quantity}</span>
            <button className={styles.qtyBtn} onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button 
            className={styles.addToCartBtn} 
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button className={styles.buyNowBtn} onClick={handleBuyNow}>
            <span>Buy Now</span>
            <img src="/images/buy-now-arrow.svg" alt="" className={styles.buyNowIcon} />
          </button>
        </div>
      </div>

      <TrustBadges />
    </div>
  );
};

export default ProductOptions;
