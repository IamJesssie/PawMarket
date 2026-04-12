import { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name}
          className={isHovered ? 'hovered' : ''}
        />
        {product.discount && (
          <span className="discount-badge">-{product.discount}%</span>
        )}
        <button 
          className={`add-to-cart-btn ${isHovered ? 'visible' : ''}`}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        
        <div className="product-price">
          {product.discount ? (
            <>
              <span className="original-price">₱{product.price.toFixed(2)}</span>
              <span className="discounted-price">
                ₱{(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="current-price">₱{product.price.toFixed(2)}</span>
          )}
        </div>
        
        <div className="product-rating">
          <span className="stars">★★★★☆</span>
          <span className="rating-count">({product.rating})</span>
        </div>
        
        <button 
          className="quick-add-btn"
          onClick={handleAddToCart}
        >
          + Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;