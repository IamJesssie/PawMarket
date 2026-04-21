import { createContext, useContext, useReducer, useCallback } from 'react';

const OrderContext = createContext();

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };

    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        )
      };

    case 'ADD_LOYALTY_POINTS':
      return {
        ...state,
        loyaltyPoints: state.loyaltyPoints + action.payload
      };

    case 'USE_LOYALTY_POINTS':
      if (state.loyaltyPoints >= action.payload) {
        return {
          ...state,
          loyaltyPoints: state.loyaltyPoints - action.payload
        };
      }
      return state;

    case 'SET_LOYALTY_POINTS':
      return {
        ...state,
        loyaltyPoints: action.payload
      };

    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [orderState, dispatch] = useReducer(orderReducer, {
    orders: [],
    loyaltyPoints: 480 // Initial loyalty points
  });

  const createOrder = useCallback((orderData) => {
    const orderId = `#PM-${Date.now()}`;
    const isGrooming = orderData.type === 'grooming';
    const newOrder = {
      id: orderId,
      ...orderData,
      status: isGrooming ? 'Appointment Created' : 'To be shipped',
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'CREATE_ORDER', payload: newOrder });
    return orderId;
  }, []);

  const updateOrderStatus = useCallback((orderId, status) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
    
    // Add loyalty points when order is received or service is completed
    if (status === 'Order Received' || status === 'Service Completed') {
      dispatch({ type: 'ADD_LOYALTY_POINTS', payload: 2 });
    }
  }, []);

  const addLoyaltyPoints = useCallback((points) => {
    dispatch({ type: 'ADD_LOYALTY_POINTS', payload: points });
  }, []);

  const useLoyaltyPoints = useCallback((points) => {
    dispatch({ type: 'USE_LOYALTY_POINTS', payload: points });
    return orderState.loyaltyPoints >= points;
  }, [orderState.loyaltyPoints]);

  const getVoucherDiscount = useCallback(() => {
    // 2 points = 10 pesos off
    // So for every 2 points, user gets 10 pesos discount
    return Math.floor(orderState.loyaltyPoints / 2) * 10;
  }, [orderState.loyaltyPoints]);

  const redeemPoints = useCallback((points) => {
    const success = useLoyaltyPoints(points);
    if (success) {
      return (points / 2) * 10; // Return discount amount
    }
    return 0;
  }, [useLoyaltyPoints]);

  const getOrderById = useCallback((orderId) => {
    return orderState.orders.find(order => order.id === orderId);
  }, [orderState.orders]);

  const getOrders = useCallback(() => {
    return orderState.orders;
  }, [orderState.orders]);

  return (
    <OrderContext.Provider value={{
      orders: orderState.orders,
      loyaltyPoints: orderState.loyaltyPoints,
      createOrder,
      updateOrderStatus,
      addLoyaltyPoints,
      useLoyaltyPoints,
      getVoucherDiscount,
      redeemPoints,
      getOrderById,
      getOrders
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
