import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('sundry-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [discountCode, setDiscountCode] = useState(() => {
    try {
      return localStorage.getItem('sundry-discount-code') || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sundry-cart', JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity
        };
        return newItems;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });

    setToastMessage(`Added 1× ${product.name} to Tray`);
    setIsCartOpen(true);

    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const applyDiscountCode = (code = 'ATELIER15') => {
    setDiscountCode(code);
    try {
      localStorage.setItem('sundry-discount-code', code);
    } catch {}
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotalNumeric = items.reduce((sum, item) => {
    const priceNum = item.product.priceNum || parseInt(item.product.price.replace(/[^0-9]/g, ''), 10) || 0;
    return sum + priceNum * item.quantity;
  }, 0);

  const discountPercent = discountCode ? 15 : 0;
  const discountNumeric = Math.round((subtotalNumeric * discountPercent) / 100);
  const finalTotalNumeric = subtotalNumeric - discountNumeric;

  const formattedSubtotal = `₹${subtotalNumeric.toLocaleString('en-IN')}`;
  const formattedDiscount = `−₹${discountNumeric.toLocaleString('en-IN')}`;
  const formattedTotal = `₹${finalTotalNumeric.toLocaleString('en-IN')}`;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotalNumeric,
        formattedSubtotal,
        discountCode,
        discountPercent,
        formattedDiscount,
        formattedTotal,
        finalTotalNumeric,
        applyDiscountCode,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        toastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
