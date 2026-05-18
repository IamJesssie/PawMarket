import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import CartItem from '../components/ShoppingCart/CartItem';
import OrderStatus from '../components/ShoppingCart/OrderStatus';
import styles from './ShoppingCart.module.css';

const ShoppingCart = () => {
  const { items, getCartTotal, clearCart, removeFromCart, updateQuantity } = useCart();
  const { createOrder, loyaltyPoints, useLoyaltyPoints, redeemPoints } = useOrder();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [useLoyaltyVoucher, setUseLoyaltyVoucher] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [showOrderStatus, setShowOrderStatus] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const order = createOrder({
        items,
        subtotal: total,
        shipping,
        discount: appliedPromo ? total * 0.1 : 0,
        loyaltyDiscount: useLoyaltyVoucher ? Math.floor(loyaltyPoints / 2) * 10 : 0,
        total: finalTotal
      });

      // Use loyalty points if voucher was redeemed
      if (useLoyaltyVoucher && loyaltyPoints >= 2) {
        const pointsUsed = Math.floor(loyaltyPoints / 2) * 2;
        useLoyaltyPoints(pointsUsed);
      }

      setOrderId(order);
      setShowOrderStatus(true);
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

  const canUseLoyaltyVoucher = loyaltyPoints >= 2;
  const loyaltyDiscount = useLoyaltyVoucher ? Math.floor(loyaltyPoints / 2) * 10 : 0;

  if (items.length === 0 && !showOrderStatus) {
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
            <div className={styles.recommendedItem}></div>
            <div className={styles.recommendedItem}></div>
            <div className={styles.recommendedItem}></div>
          </div>
        </section>
      </div>
    );
  }

  if (showOrderStatus && orderId) {
    return (
      <div className={styles.shoppingCartPage}>
        <OrderStatus 
          orderId={orderId} 
          onClose={() => {
            setShowOrderStatus(false);
            setOrderId(null);
          }}
        />
      </div>
    );
  }

  const total = getCartTotal();
  const shipping = total > 1000 ? 0 : 100;
  const discount = appliedPromo ? total * 0.1 : 0;
  const finalTotal = total + shipping - discount - loyaltyDiscount;

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

              {/* Loyalty Voucher Section */}
              {canUseLoyaltyVoucher && (
                <div className={styles.loyaltySection}>
                  <div className={styles.loyaltyCheckbox}>
                    <input
                      type="checkbox"
                      id="loyaltyVoucher"
                      checked={useLoyaltyVoucher}
                      onChange={(e) => setUseLoyaltyVoucher(e.target.checked)}
                    />
                    <label htmlFor="loyaltyVoucher">
                      Use Loyalty Voucher ({Math.floor(loyaltyPoints / 2) * 2} points)
                    </label>
                  </div>
                </div>
              )}

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

              {useLoyaltyVoucher && loyaltyDiscount > 0 && (
                <div className={styles.summaryRow}>
                  <span>Loyalty Voucher</span>
                  <span className={styles.discountValue}>-₱{loyaltyDiscount.toFixed(2)}</span>
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
                {isCheckingOut ? 'Processing...' : 'Confirm & Pay'}
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
          <div className={styles.recommendedItem}></div>
          <div className={styles.recommendedItem}></div>
          <div className={styles.recommendedItem}></div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;