import React from 'react';
import styles from './CartItem.module.css';

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
  const originalPrice = item.originalPrice || item.price * 1.2; 
  const savings = originalPrice - item.price;

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <img src={item.image} alt={item.name} className={styles.productImage} />
      </div>
      
      <div className={styles.detailsContainer}>
        <div className={styles.headerRow}>
          <div className={styles.infoCol}>
            <h3 className={styles.productName}>{item.name}</h3>
            <p className={styles.variantInfo}>{item.variant || `${item.category}`}</p>
            <div className={styles.stockBadge}>
              <span className={styles.stockText}>✓ In Stock</span>
            </div>
          </div>
          
          <div className={styles.priceCol}>
            <p className={styles.currentPrice}>
              ₱{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className={styles.originalPrice}>
              ₱{originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className={styles.savingsText}>
              SAVE ₱{savings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        
        <div className={styles.actionsRow}>
          <div className={styles.leftActions}>
            <button className={styles.actionBtn} onClick={() => onSaveForLater(item.id)}>
              Save for later
            </button>
            <div className={styles.divider}></div>
            <button className={styles.actionBtn} onClick={() => onRemove(item.id)}>
              <img src="/images/cart-remove.svg" alt="" className={styles.removeIcon} />
              Remove
            </button>
          </div>
          
          <div className={styles.quantityControls}>
            <button 
              className={styles.qtyBtn} 
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className={styles.qtyValue}>{item.quantity}</span>
            <button 
              className={styles.qtyBtn} 
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
