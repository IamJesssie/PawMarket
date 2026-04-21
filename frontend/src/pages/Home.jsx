import React from 'react';
import { Link } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import styles from './Home.module.css';

const Home = () => {
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Unleash the <span className={styles.heroTitleHighlight}>Joy</span> of Pet Ownership
          </h1>
          <p className={styles.heroSubtitle}>
            Premium supplies and expert grooming services for your furry, feathery, and scaly best friends.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/products" className={styles.primaryButton}>Shop Now →</Link>
            <Link to="/grooming" className={styles.secondaryButton}>Book Grooming</Link>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
           <img src="/images/mnvybq1w-a4pxonk.png" alt="Happy dog running in a meadow" className={styles.heroImage} />
        </div>
      </section>

      {/* Featured Picks */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Featured Picks</h2>
            <p className={styles.sectionSubtitle}>Curated for their happiness and health.</p>
          </div>
          <Link to="/products" className={styles.viewAllLink}>View All</Link>
        </div>
        
        <div className={styles.productGrid}>
          {featuredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Link to={`/products/${product.id}`} className={styles.imageLink}>
                <div className={styles.productImageWrapper}>
                  <img src={product.image} alt={product.name} className={styles.productImage} />
                </div>
              </Link>
              <div className={styles.productInfo}>
                <span className={styles.productCategory}>{product.category}</span>
                <Link to={`/products/${product.id}`} className={styles.nameLink}>
                  <h3 className={styles.productName}>{product.name}</h3>
                </Link>
                <div className={styles.productFooter}>
                  <span className={styles.productPrice}>₱{product.price.toLocaleString()}.00</span>
                  <button className={styles.addToCartButton}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sanctuary Spa Section */}
      <section className={styles.spaSection}>
        <div className={styles.spaContainer}>
          <div className={styles.spaContent}>
            <span className={styles.spaLabel}>Professional Care</span>
            <h2 className={styles.spaTitle}>The Kinetic Sanctuary Spa</h2>
            <p className={styles.spaDescription}>
              Give your pet the royal treatment. Our expert groomers provide stress-free, luxurious spa days for dogs and cats of all breeds.
            </p>
            <div className={styles.spaButtons}>
              <Link to="/grooming" className={styles.spaPrimaryButton}>Book Appointment</Link>
              <button className={styles.spaSecondaryButton}>Learn More</button>
            </div>
          </div>
          <div className={styles.spaImageWrapper}>
            <img src="/images/salon-image.png" alt="Grooming Salon" className={styles.spaImage} />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterCard}>
          <h2 className={styles.newsletterTitle}>Join the Pack</h2>
          <p className={styles.newsletterSubtitle}>
            Subscribe to our newsletter for exclusive offers, pet care tips, and early access to new arrivals.
          </p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Enter your email address" className={styles.emailInput} required />
            <button type="submit" className={styles.subscribeButton}>Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
