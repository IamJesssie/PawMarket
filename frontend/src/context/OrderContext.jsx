import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../supabaseClient';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user, profile, isAuthenticated, updateLocalProfile } = useAuth();
  
  // Now loyalty points come directly from the authenticated user's profile
  const loyaltyPoints = profile?.loyaltyPoints || 0;

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

  const updatePointsInSupabase = async (newPoints) => {
    if (isAuthenticated && user?.id) {
      try {
        // Optimistically update local context so UI changes instantly
        updateLocalProfile({ loyaltyPoints: newPoints });
        
        // Persist to database
        await supabase
          .from('profiles')
          .update({ loyalty_points: newPoints })
          .eq('id', user.id);
      } catch (err) {
        console.error("Error updating points in Supabase", err);
      }
    }
  };

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
      updatePointsInSupabase(loyaltyPoints + 2);
    }
  }, [loyaltyPoints]);

  const useLoyaltyPoints = useCallback((points) => {
    if (loyaltyPoints >= points) {
      updatePointsInSupabase(loyaltyPoints - points);
      return true;
    }
    return false;
  }, [loyaltyPoints]);

  const getOrderById = useCallback((orderId) => {
    if (!orderId) return null;
    const strId = orderId.toString();
    const rawId = parseInt(strId.replace('#PM-', '').replace('#APT-', ''), 10);
    return orders.find(order => order.id === rawId || `#PM-${order.id}` === strId || `#APT-${order.id}` === strId);
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
