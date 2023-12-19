import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish) => {
    setCartItems((prevCartItems) => {
      const itemInCart = prevCartItems.find((item) => item.id === dish.id);

      if (itemInCart) {
        // If the item is already in the cart, increment the quantity
        return prevCartItems.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If the item is not in the cart, add it with a quantity of 1
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
          // If the item is in the cart and its quantity is 1, remove the item from the cart
          return prevCartItems.filter((item) => item.id !== dishId);
        }
      } else {
        // If the item is not in the cart, return the previous cart items
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
        // If the item is not in the cart, return the previous cart items
        return prevCartItems;
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decrementQuantityFromCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
