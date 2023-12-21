import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box, Typography } from "@mui/material";
import { theme } from "../utils/theme";

const Cart = () => {
  const { cartItems, getTotalPrice } = useContext(CartContext);

  useEffect(() => {
    // When cartItems change save the updated cart items to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "1rem",
        backgroundColor: theme.palette.primaryRed.main,
        borderRadius: "1rem",
        boxShadow: 20,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          padding: "0.5rem",
          textDecoration: "underline",
          fontStyle: "italic",
          color: theme.palette.primaryBeige.main,
        }}
      >
        Your Order
      </Typography>
      <List>
        {cartItems.map((cartItem) => (
          <ListItem key={cartItem.id}>
            <CartItem cartItem={cartItem} />
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "1rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.primaryBeige.main,
            textDecoration: "underline",
            paddingBottom: "0.5rem",
          }}
        >
          Total Price: {getTotalPrice()}€
        </Typography>
      </Box>
    </Container>
  );
};

export default Cart;
