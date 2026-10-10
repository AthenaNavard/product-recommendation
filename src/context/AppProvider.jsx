import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { loadFromStorage, saveToStorage } from "../utils/storage";

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => loadFromStorage("cart", []));
  const [priceRange, setPriceRange] = useState(() =>
    loadFromStorage("priceRange", [0, 1000]),
  );
  const [selectedCategory, setSelectedCategory] = useState(() =>
    loadFromStorage("selectedCategory", "all"),
  );

  // ذخیره خودکار در LocalStorage
  useEffect(() => {
    saveToStorage("cart", cart);
  }, [cart]);

  useEffect(() => {
    saveToStorage("priceRange", priceRange);
  }, [priceRange]);

  useEffect(() => {
    saveToStorage("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        priceRange,
        setPriceRange,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
