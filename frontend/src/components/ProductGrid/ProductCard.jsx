import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StarRating from '../common/StarRating';
import { useAuth } from '../../context/AuthContext';
import styles from './ProductGrid.module.css';

const ProductCard = ({ product, onAddToCart }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    onAddToCart(product);
  };

  return (
    <div className={styles.link}>
      <Link to={`/products/${product.id}`} className={styles.productLink}>
        <div className={styles.products}>
          <div 
            className={styles.imageContainer}
            style={{ backgroundImage: `url(${product.image})` }}
          >
            <div className={styles.container}>
              <StarRating rating={product.rating} size={12} />
              <p className={styles.productRating}>{product.rating}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className={styles.products2}>
        <div className={styles.container2}>
          <div className={styles.text}>
            <p className={styles.productCategory}>{product.category}</p>
          </div>
          <Link to={`/products/${product.id}`} className={styles.nameLink}>
            <div className={styles.heading3}>
              <p className={styles.productName}>{product.name}</p>
            </div>
          </Link>
        </div>
        <div className={styles.container3}>
          <div className={styles.text2}>
            <p className={styles.productPrice}>₱{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          <div 
            className={styles.button} 
            onClick={handleAddToCartClick}
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
