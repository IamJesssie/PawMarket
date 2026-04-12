import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { items, getCartTotal, clearCart } = useCart();
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

  if (items.length === 0) {
    return (
      <div className="shopping-cart-page">
        <div className="cart-hero">
          <div className="hero-content">
            <h1>Your Shopping Cart</h1>
            <p>Ready to complete your pet's happiness?</p>
          </div>
        </div>
        
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => window.location.href = '/products'}
          >
            Start Shopping
          </button>
          
          <div className="empty-cart-features">
            <div className="feature">
              <span className="feature-icon">🚚</span>
              <h4>Free Shipping</h4>
              <p>On orders over ₱1000</p>
            </div>
            <div className="feature">
              <span className="feature-icon">↩️</span>
              <h4>Easy Returns</h4>
              <p>30-day return policy</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <h4>Secure Checkout</h4>
              <p>Safe and encrypted</p>
            </div>
          </div>
        </div>
        
        {/* Recommended Products Section */}
        <section className="recommended-section">
          <div className="recommended-header">
            <h2>You might also like</h2>
            <p>Popular items other pet parents are loving</p>
          </div>
          
          <div className="recommended-grid">
            <div className="recommended-item">
              <div className="item-image">
                <img src="/api/placeholder/120/120" alt="Dog Toy" />
              </div>
              <div className="item-info">
                <h4>Interactive Dog Toys</h4>
                <p>₱599.00</p>
                <button className="quick-add-btn">Add to Cart</button>
              </div>
            </div>
            
            <div className="recommended-item">
              <div className="item-image">
                <img src="/api/placeholder/120/120" alt="Cat Food" />
              </div>
              <div className="item-info">
                <h4>Premium Cat Food</h4>
                <p>₱899.00</p>
                <button className="quick-add-btn">Add to Cart</button>
              </div>
            </div>
            
            <div className="recommended-item">
              <div className="item-image">
                <img src="/api/placeholder/120/120" alt="Pet Bed" />
              </div>
              <div className="item-info">
                <h4>Orthopedic Pet Bed</h4>
                <p>₱1,299.00</p>
                <button className="quick-add-btn">Add to Cart</button>
              </div>
            </div>
            
            <div className="recommended-item">
              <div className="item-image">
                <img src="/api/placeholder/120/120" alt="Grooming Kit" />
              </div>
              <div className="item-info">
                <h4>Grooming Kit</h4>
                <p>₱1,499.00</p>
                <button className="quick-add-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const total = getCartTotal();
  const shipping = total > 1000 ? 0 : 100;
  const discount = appliedPromo ? total * 0.1 : 0; // 10% discount for demo
  const finalTotal = total + shipping - discount;

  return (
    <div className="shopping-cart-page">
      {/* Hero Section */}
      <div className="cart-hero">
        <div className="hero-content">
          <h1>Your Shopping Cart</h1>
          <p>{items.length} item{items.length !== 1 ? 's' : ''} • Almost there!</p>
        </div>
      </div>

      <div className="cart-container">
        {/* Cart Items Section */}
        <main className="cart-items-section">
          <div className="section-header">
            <h2>Cart Items</h2>
            <button 
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear All
            </button>
          </div>

          <div className="cart-items-list">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="continue-shopping">
            <button 
              className="continue-btn"
              onClick={() => window.location.href = '/products'}
            >
              ← Continue Shopping
            </button>
          </div>
        </main>

        {/* Order Summary Section */}
        <aside className="order-summary-section">
          <div className="summary-card">
            <div className="summary-header">
              <h2>Order Summary</h2>
            </div>

            <div className="summary-content">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₱{total.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₱${shipping.toFixed(2)}`}</span>
              </div>

              {appliedPromo && (
                <div className="summary-row discount">
                  <span>Discount (10%)</span>
                  <span>-₱{discount.toFixed(2)}</span>
                </div>
              )}

              {/* Shipping Progress */}
              {total < 1000 && (
                <div className="shipping-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(total / 1000) * 100}%` }}
                    ></div>
                  </div>
                  <p className="progress-text">
                    Add <strong>₱{(1000 - total).toFixed(2)}</strong> more for free shipping!
                  </p>
                </div>
              )}

              {shipping === 0 && (
                <div className="free-shipping-badge">
                  🎉 You qualified for free shipping!
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Total</span>
                <span className="total-amount">₱{finalTotal.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="promo-section">
                <h3>Promo Code</h3>
                <div className="promo-input-group">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-input"
                    disabled={appliedPromo}
                  />
                  <button 
                    className="apply-promo-btn"
                    onClick={applyPromoCode}
                    disabled={appliedPromo || !promoCode.trim()}
                  >
                    {appliedPromo ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                className={`checkout-btn ${isCheckingOut ? 'loading' : ''}`}
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              {/* Security Badge */}
              <div className="security-badge">
                <span className="lock-icon">🔒</span>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <h3>We Accept</h3>
            <div className="payment-methods">
              <span className="payment-icon">💳</span>
              <span className="payment-icon">📱</span>
              <span className="payment-icon">🏦</span>
              <span className="payment-icon">💸</span>
            </div>
          </div>

          {/* Support Section */}
          <div className="support-section">
            <h3>Need Help?</h3>
            <div className="support-contacts">
              <div className="support-item">
                <span className="support-icon">📞</span>
                <span>+63 912 345 6789</span>
              </div>
              <div className="support-item">
                <span className="support-icon">✉️</span>
                <span>support@pawmarket.com</span>
              </div>
              <div className="support-item">
                <span className="support-icon">💬</span>
                <span>Live Chat</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Recommended Products */}
      <section className="recommended-section">
        <div className="recommended-header">
          <h2>Frequently bought together</h2>
          <p>Complete your pet's shopping experience</p>
        </div>
        
        <div className="recommended-grid">
          <div className="recommended-item">
            <div className="item-image">
              <img src="/api/placeholder/120/120" alt="Pet Treats" />
            </div>
            <div className="item-info">
              <h4>Organic Pet Treats</h4>
              <div className="item-price">
                <span className="original-price">₱799.00</span>
                <span className="current-price">₱599.00</span>
              </div>
              <button className="quick-add-btn">Add to Cart</button>
            </div>
          </div>
          
          <div className="recommended-item">
            <div className="item-image">
              <img src="/api/placeholder/120/120" alt="Pet Bowl" />
            </div>
            <div className="item-info">
              <h4>Stainless Steel Bowl</h4>
              <div className="item-price">
                <span className="current-price">₱399.00</span>
              </div>
              <button className="quick-add-btn">Add to Cart</button>
            </div>
          </div>
          
          <div className="recommended-item">
            <div className="item-image">
              <img src="/api/placeholder/120/120" alt="Pet Leash" />
            </div>
            <div className="item-info">
              <h4>Premium Dog Leash</h4>
              <div className="item-price">
                <span className="original-price">₱699.00</span>
                <span className="current-price">₱499.00</span>
              </div>
              <button className="quick-add-btn">Add to Cart</button>
            </div>
          </div>
          
          <div className="recommended-item">
            <div className="item-image">
              <img src="/api/placeholder/120/120" alt="Pet Shampoo" />
            </div>
            <div className="item-info">
              <h4>Natural Pet Shampoo</h4>
              <div className="item-price">
                <span className="current-price">₱299.00</span>
              </div>
              <button className="quick-add-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;