import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(480);
  const { user, isAuthenticated } = useAuth();

  const fetchOrders = useCallback(async () => {
    if (isAuthenticated && user?.id) {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/user/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (err) {
        console.error("Failed to fetch orders from backend", err);
      }
    } else {
      setOrders([]);
    }
  }, [user?.id, isAuthenticated]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const createOrder = useCallback(async (orderData) => {
    if (!isAuthenticated || !user?.id) {
      alert("Please login to place an order.");
      return null;
    }

    try {
      // Map frontend cart data to backend Order format
      const payload = {
        userId: user.id,
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        discount: orderData.discount + (orderData.loyaltyDiscount || 0),
        total: orderData.total,
        status: orderData.type === 'grooming' ? 'Appointment Created' : 'To be shipped',
        items: orderData.items ? orderData.items.map(item => ({
          product: { id: item.id },
          quantity: item.quantity,
          unitPrice: item.price
        })) : []
      };

      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const newOrder = await response.json();
        setOrders(prev => [newOrder, ...prev]);
        return `#PM-${newOrder.id}`;
      } else {
        console.error("Order creation failed on backend");
        return null;
      }
    } catch (err) {
      console.error("Network error during order creation", err);
      return null;
    }
  }, [user?.id, isAuthenticated]);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
    
    if (status === 'Order Received' || status === 'Service Completed') {
      setLoyaltyPoints(prev => prev + 2);
    }
  }, []);

  const useLoyaltyPoints = useCallback((points) => {
    if (loyaltyPoints >= points) {
      setLoyaltyPoints(prev => prev - points);
      return true;
    }
    return false;
  }, [loyaltyPoints]);

  const getOrderById = useCallback((orderId) => {
    const rawId = parseInt(orderId.replace('#PM-', ''), 10);
    return orders.find(order => order.id === rawId || `#PM-${order.id}` === orderId);
  }, [orders]);

  const getVoucherDiscount = useCallback(() => {
    return Math.floor(loyaltyPoints / 2) * 10;
  }, [loyaltyPoints]);

  return (
    <OrderContext.Provider value={{
      orders,
      loyaltyPoints,
      createOrder,
      updateOrderStatus,
      useLoyaltyPoints,
      getOrderById,
      getVoucherDiscount,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};
