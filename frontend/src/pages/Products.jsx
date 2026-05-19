import { useState, useEffect } from 'react';
import API_BASE_URL from '../apiConfig';
import { useCart } from '../context/CartContext';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (response.ok) {
          const data = await response.json();
          // Map backend data to frontend format
          const mappedData = data.map(p => ({
            ...p,
            image: p.imageUrl,
            sizes: ['1 kg', '2 kg', '5 kg', '10 kg', '15 kg'],
            flavors: ['Chicken', 'Beef', 'Salmon', 'Lamb'],
            images: [p.imageUrl, p.imageUrl, p.imageUrl, p.imageUrl]
          }));
          setProducts(mappedData);
          setFilteredProducts(mappedData);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()));
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
    return <div style={{ padding: '100px', textAlign: 'center' }}>Loading products...</div>;
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
