import React from 'react';
import styles from './FilterSidebar.module.css';

const FilterSidebar = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  priceRange, 
  setPriceRange,
  onApplyFilters 
}) => {
  return (
    <div className={styles.products}>
      <div className={styles.container2}>
        <div className={styles.heading3}>
          <p className={styles.categoryLabel}>Category</p>
        </div>
        <div className={styles.container}>
          {categories.map((category) => (
            <div 
              key={category}
              className={`${styles.label} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category)}
              style={{ cursor: 'pointer' }}
            >
              <p className={styles.aAllProducts}>
                {selectedCategory === category ? '● ' : ''}{category}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.container4}>
        <div className={styles.heading32}>
          <p className={styles.priceRangeLabel}>Price Range</p>
        </div>
        <div className={styles.container3}>
          <div className={styles.textInput}>
            <input 
              type="number"
              className={styles.priceInput}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              placeholder="₱0"
            />
          </div>
          <div className={styles.text}>
            <p className={styles.priceSeparator}>-</p>
          </div>
          <div className={styles.textInput}>
            <input 
              type="number"
              className={styles.priceInput}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
              placeholder="₱10000"
            />
          </div>
        </div>
      </div>
      <div className={styles.button} onClick={onApplyFilters} style={{ cursor: 'pointer' }}>
        <p className={styles.applyFiltersButton}>Apply Filters</p>
      </div>
    </div>
  );
}

export default FilterSidebar;
