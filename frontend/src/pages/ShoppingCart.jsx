import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/ShoppingCart/CartItem';
import styles from './ShoppingCart.module.css';

const ShoppingCart = () => {
  const { items, getCartTotal, clearCart, removeFromCart, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Order placed successfully!');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  const applyPromoCode = () => {
    if (promoCode.trim() && !appliedPromo) {
      setAppliedPromo(true);
      alert('Promo code applied successfully!');
    }
  };

  const handleSaveForLater = (id) => {
    alert('Item saved for later!');
    removeFromCart(id);
  };

  if (items.length === 0) {
    return (
      <div className={styles.shoppingCartPage}>
        <div className={styles.cartHeader}>
          <h1 className={styles.pageTitle}>Your Shopping Cart</h1>
          <div className={styles.checkoutStepper}>
            <div className={`${styles.step} ${styles.active}`}>
              <div className={styles.stepNumber}>1</div>
              <span className={styles.stepLabel}>Cart</span>
            </div>
            <div className={styles.stepConnector}></div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <span className={styles.stepLabel}>Checkout</span>
            </div>
            <div className={styles.stepConnector}></div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <span className={styles.stepLabel}>Payment</span>
            </div>
          </div>
        </div>
        
        <div className={styles.emptyCart}>
          <span className={styles.emptyCartIcon}>🛒</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet</p>
          <Link to="/products" className={styles.continueShoppingBtn}>
            Start Shopping
          </Link>
        </div>
        
        {/* Recommended Products Section */}
        <section className={styles.recommendedSection}>
          <div className={styles.recommendedHeader}>
            <h2>You might also like</h2>
            <p>Popular items other pet parents are loving</p>
          </div>
          
          <div className={styles.recommendedGrid}>
            {/* Mock recommended items */}
            {[1, 2, 3].map(i => (
              <div key={i} className={styles.recommendedItem}>
                {/* Simplified for now as there's no specific recommended item component */}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  const total = getCartTotal();
  const shipping = total > 1000 ? 0 : 100;
  const discount = appliedPromo ? total * 0.1 : 0;
  const finalTotal = total + shipping - discount;

  return (
    <div className={styles.shoppingCartPage}>
      <div className={styles.cartHeader}>
        <h1 className={styles.pageTitle}>Your Shopping Cart</h1>
        <div className={styles.checkoutStepper}>
          <div className={`${styles.step} ${styles.active}`}>
            <div className={styles.stepNumber}>1</div>
            <span className={styles.stepLabel}>Cart</span>
          </div>
          <div className={styles.stepConnector}></div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <span className={styles.stepLabel}>Checkout</span>
          </div>
          <div className={styles.stepConnector}></div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <span className={styles.stepLabel}>Payment</span>
          </div>
        </div>
      </div>

      <div className={styles.cartContainer}>
        {/* Cart Items Section */}
        <main className={styles.cartItemsSection}>
          <div className={styles.sectionHeader}>
            <h2>Cart Items ({items.length})</h2>
            <button className={styles.clearCartBtn} onClick={clearCart}>
              Clear All
            </button>
          </div>

          <div className={styles.itemsListContainer}>
            {items.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onSaveForLater={handleSaveForLater}
              />
            ))}
          </div>

          <Link to="/products" className={styles.continueLink}>
            ← Continue Shopping
          </Link>
        </main>

        {/* Order Summary Section */}
        <aside className={styles.orderSummarySection}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryHeader}>
              <h2>Order Summary</h2>
            </div>

            <div className={styles.summaryContent}>
              {/* Promo Code */}
              <div className={styles.promoSection}>
                <h3>Promo Code</h3>
                <div className={styles.promoInputGroup}>
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className={styles.promoInput}
                    disabled={appliedPromo}
                  />
                  <button 
                    className={styles.applyPromoBtn}
                    onClick={applyPromoCode}
                    disabled={appliedPromo || !promoCode.trim()}
                  >
                    {appliedPromo ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </div>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₱{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₱${shipping.toFixed(2)}`}</span>
              </div>

              {appliedPromo && (
                <div className={styles.summaryRow}>
                  <span>Discount (10%)</span>
                  <span className={styles.discountValue}>-₱{discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total</span>
                <span className={styles.totalAmount}>₱{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              <button 
                className={styles.checkoutBtn}
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>

            <div className={styles.trustBadgesContainer}>
              <div className={styles.trustBadge}>
                <img src="/images/cart-shipping.svg" alt="" />
                <span>Free Shipping</span>
              </div>
              <div className={styles.trustBadge}>
                <img src="/images/cart-returns.svg" alt="" />
                <span>Easy Returns</span>
              </div>
              <div className={styles.trustBadge}>
                <img src="/images/cart-secure.svg" alt="" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Recommended Section */}
      <section className={styles.recommendedSection}>
        <div className={styles.recommendedHeader}>
          <h2>You might also like</h2>
          <p>Popular items other pet parents are loving</p>
        </div>
        
        <div className={styles.recommendedGrid}>
          {/* Mock recommended items placeholders */}
          <div className={styles.recommendedItem}></div>
          <div className={styles.recommendedItem}></div>
          <div className={styles.recommendedItem}></div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;