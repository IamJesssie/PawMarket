import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/ShoppingCart/CartItem';
import ProductCard from '../components/ProductGrid/ProductCard';
import styles from './ShoppingCart.module.css';

const ShoppingCart = () => {
  const { items, getCartTotal, clearCart, updateQuantity, removeFromCart, addToCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);

  const subtotal = getCartTotal();
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const tax = subtotal * 0.08;
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal - discount + tax + (subtotal > 0 ? shipping : 0);

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setAppliedPromo(true);
      alert('Promo code applied!');
    } else {
      alert('Invalid promo code. Try "SAVE10"');
    }
  };

  const steps = [
    { number: 1, label: 'Cart', status: 'active' },
    { number: 2, label: 'Shipping', status: 'inactive' },
    { number: 3, label: 'Payment', status: 'inactive' },
    { number: 4, label: 'Confirmation', status: 'inactive' }
  ];

  const recommendedProducts = [
    {
      id: 101,
      name: 'Interactive Dog Toy',
      category: 'Dog Toys',
      price: 599,
      image: '/images/mnvybq1v-mjzc7js.png',
      rating: 4.5
    },
    {
      id: 102,
      name: 'Organic Pet Treats',
      category: 'Treats',
      price: 350,
      image: '/images/mnvybq1v-v6t6rlx.png',
      rating: 4.8
    },
    {
      id: 103,
      name: 'Cozy Pet Blanket',
      category: 'Bedding',
      price: 850,
      image: '/images/mnvybq1v-dce60t4.png',
      rating: 4.2
    }
  ];

  if (items.length === 0) {
    return (
      <div className={styles.shoppingCartPage}>
        <div className={styles.emptyCart}>
          <span className={styles.emptyCartIcon}>🛒</span>
          <h2>Your cart is empty</h2>
          <p>Ready to complete your pet's happiness? Browse our premium products!</p>
          <Link to="/products" className={styles.continueShoppingBtn}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shoppingCartPage}>
      <div className={styles.cartHeader}>
        <h1 className={styles.pageTitle}>Shopping Cart</h1>
        
        <div className={styles.checkoutStepper}>
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className={`${styles.step} ${styles[step.status]}`}>
                <div className={styles.stepNumber}>{step.status === 'completed' ? '✓' : step.number}</div>
                <span className={styles.stepLabel}>{step.label}</span>
              </div>
              {index < steps.length - 1 && <div className={styles.stepConnector}></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className={styles.cartContainer}>
        {/* Left Column: Cart Items */}
        <div className={styles.cartItemsSection}>
          <div className={styles.sectionHeader}>
            <h2>Cart Items ({items.length})</h2>
            <button className={styles.clearCartBtn} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
          
          <div className={styles.itemsListContainer}>
            {items.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onSaveForLater={(id) => console.log('Save for later:', id)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <h2>Order Summary</h2>
          </div>
          
          <div className={styles.promoSection}>
            <h3>Promo / Coupon Code</h3>
            <div className={styles.promoInputGroup}>
              <input 
                type="text" 
                placeholder="Enter promo code" 
                className={styles.promoInput}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className={styles.applyPromoBtn} onClick={handleApplyPromo}>
                Apply
              </button>
            </div>
          </div>

          <div className={styles.summaryContent}>
            <div className={styles.summaryRow}>
              <span>Subtotal ({items.length} items)</span>
              <span>₱{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.discountLabel}>Discount</span>
              <span className={styles.discountValue}>-₱{discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated Tax</span>
              <span>₱{tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₱${shipping.toFixed(2)}`}</span>
            </div>
            
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span className={styles.totalLabel}>Order Total</span>
              <span className={styles.totalAmount}>₱{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            <button className={styles.checkoutBtn}>
              Proceed to Checkout
            </button>
            
            <Link to="/products" className={styles.continueLink}>
              Continue Shopping
            </Link>

            <div className={styles.trustBadgesContainer}>
              <div className={styles.trustBadge}>
                <img src="/images/cart-secure.svg" alt="" />
                <span>Secure Checkout</span>
              </div>
              <div className={styles.trustBadge}>
                <img src="/images/cart-returns.svg" alt="" />
                <span>30-Day Returns</span>
              </div>
              <div className={styles.trustBadge}>
                <img src="/images/cart-shipping.svg" alt="" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <section className={styles.recommendedSection}>
        <div className={styles.recommendedHeader}>
          <h2>You May Also Like</h2>
          <p>Complete your pet's shopping experience</p>
        </div>
        
        <div className={styles.recommendedGrid}>
          {recommendedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;
