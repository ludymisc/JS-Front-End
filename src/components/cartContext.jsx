import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const updateCartItem = (id, newQty) => {
  setCart(prevCart =>
    prevCart.map(item =>
      item.id === id
        ? { ...item, quantity: newQty }
        : item
    )
  );
};

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, removeFromCart, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
