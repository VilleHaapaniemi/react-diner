import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Container maxWidth="md" sx={{ backgroundColor: "whitesmoke" }}>
      <List>
        {cartItems.map((cartItem) => (
          <ListItem key={cartItem.id}>
            <CartItem cartItem={cartItem} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Cart;
