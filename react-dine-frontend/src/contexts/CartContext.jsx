import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const addToCart = (dish) => {
    setCartItems((prevCartItems) => {
      const itemInCart = prevCartItems.find((item) => item.id === dish.id);

      if (itemInCart) {
        // If the item is already in the cart, increment the quantity
        return prevCartItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Else add it with a quantity of 1
        return [...prevCartItems, { ...dish, quantity: 1 }];
      }
    });
  };

  const decrementQuantityFromCart = (dishId) => {
    setCartItems((prevCartItems) => {
      const itemInCart = prevCartItems.find((item) => item.id === dishId);

      if (itemInCart) {
        // If the item is in the cart and its quantity is more than 1, decrement the quantity
        if (itemInCart.quantity > 1) {
          return prevCartItems.map((item) =>
            item.id === dishId ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          // If quantity is 1, remove the item from the cart
          return prevCartItems.filter((item) => item.id !== dishId);
        }
      } else {
        return prevCartItems;
      }
    });
  };

  const removeFromCart = (dishId) => {
    setCartItems((prevCartItems) => {
      const itemInCart = prevCartItems.find((item) => item.id === dishId);

      if (itemInCart) {
        return prevCartItems.filter((item) => item.id !== dishId);
      } else {
        return prevCartItems;
      }
    });
  };

  const getCartItemsIdAndQuantity = () => {
    return cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
  };

  const getTotalPrice = () => {
    return (
      Math.round(
        cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) * 100
      ) / 100
    ).toFixed(2);
  };

  const getCartQuantityCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decrementQuantityFromCart,
        removeFromCart,
        getCartItemsIdAndQuantity,
        getTotalPrice,
        getCartQuantityCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
