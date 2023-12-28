import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import Menu from "../components/Menu";
import { theme } from "../utils/theme";
import CartNotificationItem from "../components/CartNotificationItem";

const Home = () => {
  const { cartItems, getCartQuantityCount, getTotalPrice } =
    useContext(CartContext);
  const [showNotification, setShowNotification] = useState(false);
  const [cartItemsQuantity, setCartItemsQuantity] =
    useState(getCartQuantityCount);

  useEffect(() => {
    const itemsQuantity = getCartQuantityCount();
    if (itemsQuantity > cartItemsQuantity) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
    setCartItemsQuantity(itemsQuantity);
  }, [cartItems, cartItemsQuantity, getCartQuantityCount]);

  return (
    <>
      {/* {showNotification && ( */}
      <List
        style={{
          position: "fixed",
          minWidth: "18vw",
          right: "1rem",
          zIndex: 2000,
          backgroundColor: theme.palette.primaryBeige.dark,
          borderLeft: `0.3rem solid ${theme.palette.primaryRed.main}`,
          borderBottom: `0.3rem solid ${theme.palette.primaryRed.main}`,
          borderRight: `0.3rem solid ${theme.palette.primaryRed.main}`,
          borderBottomLeftRadius: "1rem",
          borderBottomRightRadius: "1rem",
          opacity: showNotification ? 1 : 0,
          pointerEvents: showNotification ? "auto" : "none",
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {cartItems.map((dish) => (
          <ListItem key={dish.id}>
            <CartNotificationItem dish={dish} />
          </ListItem>
        ))}
        <Typography
          variant="h6"
          sx={{
            marginTop: "1rem",
            color: theme.palette.secondaryRed.main,
            textDecoration: "underline",
          }}
        >
          Total Price: {getTotalPrice()}€
        </Typography>
      </List>
      {/* )} */}

      <Typography
        variant="h1"
        sx={{
          textDecoration: "underline",
          fontStyle: "italic",
          color: theme.palette.secondaryRed.main,
        }}
      >
        Menu
      </Typography>
      <Menu />
    </>
  );
};

export default Home;
