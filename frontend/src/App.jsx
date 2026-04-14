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
                <Route path="/" element={
                  <div className="home-page">
                    <div className="hero-section">
                      <h1>Welcome to PawMarket</h1>
                      <p>Your one-stop shop for all pet needs</p>
                      <div className="hero-buttons">
                        <Link to="/products" className="cta-button">
                          Browse Products
                        </Link>
                        <Link to="/cart" className="cta-button secondary">
                          View Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                } />
                <Route path="/products" element={<Products />} />
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