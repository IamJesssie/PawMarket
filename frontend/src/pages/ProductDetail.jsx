import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import StarRating from '../components/common/StarRating';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const foundProduct = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  if (!product) return <div className={styles.loading}>Loading product details...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate('/products')}>Products</span> / {product.category}
      </div>

      <div className={styles.mainGrid}>
        {/* Product Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.mainImageContainer}>
            <img src={product.image} alt={product.name} className={styles.mainImage} />
          </div>
        </div>

        {/* Product Info Section */}
        <div className={styles.infoSection}>
          <span className={styles.brand}>{product.brand}</span>
          <h1 className={styles.productName}>{product.name}</h1>
          
          <div className={styles.ratingOverview}>
            <StarRating rating={product.rating} size={20} />
            <span className={styles.ratingText}>{product.rating} ({product.reviewCount} Reviews)</span>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>₱{product.price.toLocaleString()}.00</span>
            <span className={styles.stockStatus}>In Stock</span>
          </div>

          <p className={styles.shortDescription}>{product.description}</p>

          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <button className={styles.qtyBtn}>-</button>
              <span className={styles.qtyValue}>1</span>
              <button className={styles.qtyBtn}>+</button>
            </div>
            <button 
              className={styles.addBtn}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>

          <div className={styles.highlights}>
            <div className={styles.highlightItem}>
              <img src="/images/free-shipping.svg" alt="Free Shipping" />
              <span>Free Shipping over ₱2,000</span>
            </div>
            <div className={styles.highlightItem}>
              <img src="/images/returns.svg" alt="Returns" />
              <span>Easy 30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabHeaders}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'description' ? styles.active : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviewCount})
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'description' ? (
            <div className={styles.descriptionText}>
              <p>{product.description}</p>
              <p>Experience the best for your pets with PawMarket. Our products are carefully selected to ensure the highest quality and safety for your furry friends.</p>
            </div>
          ) : (
            <div className={styles.reviewsList}>
              <div className={styles.reviewSummary}>
                <div className={styles.averageScore}>
                  <h2>{product.rating}</h2>
                  <StarRating rating={product.rating} size={24} />
                  <p>Based on {product.reviewCount} reviews</p>
                </div>
                <div className={styles.scoreBars}>
                  {[5, 4, 3, 2, 1].map(score => (
                    <div key={score} className={styles.scoreRow}>
                      <span>{score} stars</span>
                      <div className={styles.barBg}>
                        <div 
                          className={styles.barFill} 
                          style={{ width: score === 5 ? '80%' : score === 4 ? '15%' : '5%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {product.reviews.map(review => (
                <div key={review.id} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.userAvatar}>{review.userName.charAt(0)}</div>
                    <div className={styles.userDetails}>
                      <h4>{review.userName}</h4>
                      <div className={styles.reviewMeta}>
                        <StarRating rating={review.rating} size={14} />
                        <span className={styles.reviewDate}>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
