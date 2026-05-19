import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import ProductGallery from '../components/ProductDetail/ProductGallery';
import ProductInfo from '../components/ProductDetail/ProductInfo';
import ProductOptions from '../components/ProductDetail/ProductOptions';
import ProductTabs from '../components/ProductDetail/ProductTabs';
import NotificationModal from '../components/common/NotificationModal';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [showCartModal, setShowCartModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        if (response.ok) {
          const p = await response.json();
          setProduct({
            ...p,
            image: p.imageUrl,
            sizes: ['1 kg', '2 kg', '5 kg', '10 kg', '15 kg'],
            flavors: ['Chicken', 'Beef', 'Salmon', 'Lamb'],
            images: [p.imageUrl, p.imageUrl, p.imageUrl, p.imageUrl],
            rating: p.rating || 0,
            reviewsCount: p.reviewsCount || 0
          });
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      // 1. Local Storage Logic (For immediate UI rendering)
      const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const isAlreadyViewed = viewed.find(p => p.id === product.id);
      if (!isAlreadyViewed) {
        const updatedViewed = [product, ...viewed].slice(0, 10);
        localStorage.setItem('recentlyViewed', JSON.stringify(updatedViewed));
      }

      // 2. Database Sync (Push to Supabase recently_viewed table)
      const logHistoryToDatabase = async () => {
        if (isAuthenticated && user?.id) {
          try {
            await supabase
              .from('recently_viewed')
              .upsert({ 
                user_id: user.id, 
                product_id: product.id,
                viewed_at: new Date().toISOString()
              }, { onConflict: 'user_id,product_id' });
          } catch (err) {
            console.error('Failed to log history', err);
          }
        }
      };
      
      logHistoryToDatabase();
      window.scrollTo(0, 0);
    }
  }, [product?.id, isAuthenticated, user?.id]);

  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Loading product details...</div>;
  }

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
