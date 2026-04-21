import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const { isDark, toggleTheme } = useTheme();

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
        <Link to="/help" className={styles.linkLogin}>
          <p className={styles.homeLink}>Help</p>
        </Link>
      </div>
      <div className={styles.container}>
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? (
            /* Sun icon */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            /* Moon icon */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
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
