import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);

  return <h1>Cart</h1>;
};

export default Cart;
