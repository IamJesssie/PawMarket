import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Sample products data matching Figma design exactly
        const mockProducts = [
          {
            id: 1,
            name: 'Premium Adult Dog Food',
            category: 'Dog Food',
            price: 2500,
            image: '/images/mnvybq1v-v6t6rlx.png',
            rating: 4.8,
            description: 'High-quality premium dog food for adult dogs with all essential nutrients.',
            brand: 'PawPremium'
          },
          {
            id: 2,
            name: 'Professional Grooming Kit',
            category: 'Grooming Kit',
            price: 1850,
            image: '/images/mnvybq1v-eugcbf9.png',
            rating: 4.2,
            description: 'Complete professional grooming kit for all pet types.',
            brand: 'GroomPro'
          },
          {
            id: 3,
            name: 'Interactive Feather Cat Toy',
            category: 'Cat Toy',
            price: 800,
            image: '/images/mnvybq1v-mjzc7js.png',
            rating: 4.5,
            description: 'Interactive feather toy for cats to keep them entertained and active.',
            brand: 'PlaySafe'
          },
          {
            id: 4,
            name: 'Organic Bird Seeds',
            category: 'Bird Food',
            price: 700,
            image: '/images/mnvybq1v-v6t6rlx.png', 
            rating: 4.0,
            description: 'Organic bird seeds for healthy and happy birds.',
            brand: 'NatureFeed'
          },
          {
            id: 5,
            name: 'Orthopedic Fluffy Pet Bed',
            category: 'Pet Bed',
            price: 4800,
            image: '/images/mnvybq1v-dce60t4.png',
            rating: 4.9,
            description: 'Orthopedic fluffy pet bed for maximum comfort.',
            brand: 'ComfortPaws'
          },
          {
            id: 6,
            name: 'Heavy Duty Dog Leash',
            category: 'Accessories',
            price: 1300,
            image: '/images/mnvybq1w-a4pxonk.png',
            rating: 4.7,
            description: 'Heavy duty dog leash for strong pullers.',
            brand: 'ToughPaws'
          }
        ];

        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  if (loading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

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
