import { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="cart-item-details">
        <div>
          <p className="cart-item-category">{item.category}</p>
          <h4 className="cart-item-name">{item.name}</h4>
          <p style={{ fontSize: '14px', color: '#1b1c1780', margin: '4px 0' }}>
            Variant: {item.variant || 'Standard'} | {item.stockStatus || 'In Stock'}
          </p>
        </div>
        
        <div className="cart-item-price-row">
          <div className="price-info">
            <span className="price">₱{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            {item.originalPrice && (
              <span style={{ fontSize: '14px', color: '#1b1c1740', textDecoration: 'line-through' }}>
                ₱{item.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="quantity-controls">
            <button 
              className="quantity-btn"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              −
            </button>
            
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="quantity-input"
              min="1"
            />
            
            <button 
              className="quantity-btn"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      <button className="remove-item-btn" onClick={handleRemove} title="Remove item">
        ×
      </button>
      
      {/* Additional actions from wireframe */}
      <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '16px' }}>
         <button style={{ background: 'none', border: 'none', color: '#585894', fontSize: '12px', fontWeight: '700', cursor: 'pointer', padding: 0 }}>Save for later</button>
      </div>
    </div>
  );
};

export default CartItem;
