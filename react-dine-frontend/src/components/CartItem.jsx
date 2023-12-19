import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const CartItem = ({ cartItem }) => {
  const { addToCart, decrementQuantityFromCart, removeFromCart } =
    useContext(CartContext);

  const addItem = () => {
    addToCart(cartItem);
  };

  const decrementQuantity = () => {
    decrementQuantityFromCart(cartItem.id);
  };

  const removeItem = () => {
    removeFromCart(cartItem.id);
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <CardContent
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Typography>{cartItem.name}</Typography>
        <Typography>{cartItem.quantity}</Typography>
        <Button onClick={addItem}>Increment</Button>
        <Button onClick={decrementQuantity}>Decrement</Button>
        <Button onClick={removeItem}>Remove</Button>
        <Typography>{cartItem.price * cartItem.quantity}</Typography>
      </CardContent>
    </Card>
  );
};
export default CartItem;
