import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AccountOverview from './pages/AccountOverview';
import AddressManagement from './pages/AddressManagement';
import ProfileEdit from './pages/ProfileEdit';
import ShoppingCart from './pages/ShoppingCart';
import AuthPage from './pages/AuthPage';
import Grooming from './pages/Grooming';
import Help from './pages/Help';
import Home from './pages/Home';
import RecentlyViewed from './pages/RecentlyViewed';
import Wishlist from './pages/Wishlist';
import OrderHistory from './pages/OrderHistory';
import AppointmentList from './pages/AppointmentList';
import PlaceholderPage from './pages/PlaceholderPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <OrderProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <div className="app">
                  <Navbar />

                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/:id" element={<ProductDetail />} />
                      <Route path="/recently-viewed" element={<RecentlyViewed />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/profile" element={<AccountOverview />} />
                      <Route path="/dashboard" element={<AccountOverview />} />
                      <Route path="/dashboard/profile" element={<ProfileEdit />} />
                      <Route path="/dashboard/orders" element={<OrderHistory />} />
                      <Route path="/dashboard/appointments" element={<AppointmentList />} />
                      <Route path="/dashboard/addresses" element={<AddressManagement />} />
                      <Route path="/dashboard/security" element={<PlaceholderPage title="Password & Security" />} />
                      <Route path="/dashboard/notifications" element={<PlaceholderPage title="Notifications" />} />
                      <Route path="/dashboard/payments" element={<PlaceholderPage title="Payment Methods" />} />
                      <Route path="/dashboard/pets" element={<PlaceholderPage title="My Pets" />} />
                      <Route path="/grooming" element={<Grooming />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/cart" element={<ShoppingCart />} />
                      <Route path="/login" element={<AuthPage />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                  </main>

                  <footer className="footer">
                    <p>&copy; 2026 PawMarket. All rights reserved.</p>
                  </footer>
                </div>
              </Router>
            </WishlistProvider>
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;