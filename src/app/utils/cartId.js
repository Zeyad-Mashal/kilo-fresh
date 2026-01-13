// Cart ID Management Utility
// Uses localStorage to persist cart ID across sessions

const CART_ID_KEY = 'kilo_fresh_cart_id';

export const getCartId = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  let cartId = localStorage.getItem(CART_ID_KEY);
  
  if (!cartId) {
    // Generate a simple cart ID (you can use UUID or any unique identifier)
    cartId = 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(CART_ID_KEY, cartId);
  }
  
  return cartId;
};

export const setCartId = (cartId) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_ID_KEY, cartId);
  }
};

export const clearCartId = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CART_ID_KEY);
  }
};

