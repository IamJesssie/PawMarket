import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import { products as allProducts } from '../data/products';
import './Products.css';

const Products = () => {
  const [products] = useState(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const { addToCart } = useCart();

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, products]);

  const categories = ['All Products', 'Dog Food', 'Grooming Kit', 'Cat Toy', 'Bird Food', 'Pet Bed', 'Accessories'];

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="products-page">
      <div className="products-container">
        <aside className="filters-sidebar">
          <FilterSidebar 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onApplyFilters={() => {}}
          />
        </aside>

        <main className="products-main">
          <div className="products-grid-section">
            <ProductGrid 
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
