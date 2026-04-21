import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Products from './pages/Products';
import AccountOverview from './pages/AccountOverview';
import AddressManagement from './pages/AddressManagement';
import ShoppingCart from './pages/ShoppingCart';
import AuthPage from './pages/AuthPage';
import Grooming from './pages/Grooming';
import Help from './pages/Help';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import RecentlyViewed from './pages/RecentlyViewed';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />

            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/recently-viewed" element={<RecentlyViewed />} />
                <Route path="/profile" element={<AccountOverview />} />
                <Route path="/dashboard" element={<AccountOverview />} />
                <Route path="/dashboard/addresses" element={<AddressManagement />} />
                <Route path="/grooming" element={<Grooming />} />
                <Route path="/help" element={<Help />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/login" element={<AuthPage />} />
              </Routes>
            </main>

            <footer className="footer">
              <p>&copy; 2024 PawMarket. All rights reserved.</p>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;