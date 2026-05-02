import React from 'react';
import { Link } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import ProductCard from '../components/ProductGrid/ProductCard';
import { useCart } from '../context/CartContext';
import styles from './Home.module.css';

const Home = () => {
  const { addToCart } = useCart();
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
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>

      </section>

      {/* Pet Makeovers Teaser */}
      <section className={styles.makeoverSection}>
        <div className={styles.makeoverContent}>
          <h2 className={styles.sectionTitle}>Pet Makeovers</h2>
          <p className={styles.sectionSubtitle}>Witness the magic of our professional grooming. From scruffy to fluffy in one session!</p>
          <Link to="/grooming" className={styles.viewAllLink}>View All Transformations →</Link>
        </div>
        <div className={styles.makeoverPreview}>
          {/* We'll show one transformation here as a teaser */}
          <div className={styles.teaserCard}>
            <div className={styles.teaserImage} style={{ backgroundImage: 'url(/images/mnvybq1w-a4pxonk.png)' }}>
              <div className={styles.teaserLabel}>After</div>
            </div>
            <div className={styles.teaserInfo}>
              <h3>Charlie's Fresh Look</h3>
              <p>Poodle Mix • Full Styling</p>
            </div>
          </div>
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
