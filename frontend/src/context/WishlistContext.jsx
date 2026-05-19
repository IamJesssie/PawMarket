import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user, isAuthenticated } = useAuth();

  // Load from Supabase on mount or when user changes
  useEffect(() => {
    const fetchWishlist = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const { data, error } = await supabase
            .from('wishlist')
            .select('*, products(*)')
            .eq('user_id', user.id);
            
          if (!error && data) {
            // Extract the joined product object from the wishlist rows and map imageUrl to image
            const products = data.map(item => ({
              ...item.products,
              image: item.products.image_url
            }));
            setWishlistItems(products);
          }        } catch (err) {
          console.error('Fetch wishlist error:', err);
        }
      } else {
        setWishlistItems([]);
      }
    };

    fetchWishlist();
  }, [user?.id, isAuthenticated]);

  const addToWishlist = async (product) => {
    if (!isAuthenticated || !user) return;
    
    // Optimistic UI update
    setWishlistItems((prev) => {
      const isAlreadyIn = prev.find((item) => item.id === product.id);
      if (isAlreadyIn) return prev;
      return [...prev, product];
    });

    try {
      // Save to Supabase (Note: user_id is automatically set by Supabase default we created)
      const { error } = await supabase
        .from('wishlist')
        .insert({
          product_id: product.id
        });
        
      if (error) {
        console.error('Error adding to wishlist:', error);
        // Rollback optimistic UI update silently
        setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      }
    } catch (err) {
      console.error('Exception adding to wishlist:', err);
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated || !user) return;

    // Optimistic UI update
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));

    try {
      // Remove from Supabase
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);
        
      if (error) {
        console.error('Error removing from wishlist:', error);
      }
    } catch (err) {
      console.error('Exception removing from wishlist:', err);
    }
  };

  const isInWishlist = (productId) => {
    return !!wishlistItems.find((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
