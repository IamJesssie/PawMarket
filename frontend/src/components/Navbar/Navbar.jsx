import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { getCartItemsCount } = useCart();

  return (
    <nav className={styles.header2}>
      <Link to="/" className={styles.link}>
        <p className={styles.logo3}>
          <span className={styles.logo}>Paw</span>
          <span className={styles.logo2}>Market</span>
        </p>
      </Link>
      <div className={styles.navigation}>
        <Link to="/" className={styles.link2}>
          <p className={styles.homeLink}>Home</p>
        </Link>
        <Link to="/products" className={styles.link3}>
          <p className={styles.homeLink}>Products</p>
        </Link>
        <Link to="/dashboard" className={styles.link4}>
          <p className={styles.homeLink}>Overview</p>
        </Link>
        <Link to="/grooming" className={styles.link5}>
          <p className={styles.homeLink}>Grooming</p>
        </Link>
        <div className={styles.linkLogin}>
          <p className={styles.homeLink}>Help</p>
        </div>
      </div>
      <div className={styles.container}>
        <Link to="/profile" className={styles.link6}>
          <img src="/images/mnvy88z1-niextao.svg" className={styles.icon} alt="Profile" />
        </Link>
        <Link to="/cart" className={styles.link7}>
          <img src="/images/mnvy88z1-8gog06l.svg" className={styles.icon2} alt="Cart" />
          <div className={styles.header}>
            <p className={styles.cartItemCount}>{getCartItemsCount()}</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
