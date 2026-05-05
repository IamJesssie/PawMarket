import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductGallery from '../components/ProductDetail/ProductGallery';
import ProductInfo from '../components/ProductDetail/ProductInfo';
import ProductOptions from '../components/ProductDetail/ProductOptions';
import ProductTabs from '../components/ProductDetail/ProductTabs';
import NotificationModal from '../components/common/NotificationModal';
import { products } from '../data/products';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      // Recently Viewed Logic
      const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const isAlreadyViewed = viewed.find(p => p.id === product.id);
      if (!isAlreadyViewed) {
        const updatedViewed = [product, ...viewed].slice(0, 10);
        localStorage.setItem('recentlyViewed', JSON.stringify(updatedViewed));
      }
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product Not Found</h1>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  const handleAddToCart = (item) => {
    addToCart(item);
    setModalMessage(`Added ${item.quantity} x ${item.name} to cart!`);
    setShowCartModal(true);
  };

  return (
    <div className={styles.productDetailPage}>
      <div className={styles.layout}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs}>
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>›</span>
          <Link to="/products" className={styles.breadcrumbLink}>Products</Link>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbCurrent}>{product.category}</span>
        </nav>

        {/* Product Section */}
        <div className={styles.productMain}>
          <ProductGallery product={product} />
          
          <div className={styles.infoWrapper}>
            <ProductInfo product={product} />
            <ProductOptions product={product} onAddToCart={handleAddToCart} />
          </div>
        </div>

        {/* Tabs Section */}
        <ProductTabs product={product} />
      </div>

      <NotificationModal 
        isOpen={showCartModal} 
        message={modalMessage}
        onClose={() => setShowCartModal(false)}
      />
    </div>
  );
};

export default ProductDetail;
