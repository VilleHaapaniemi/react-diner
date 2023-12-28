import { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import axios from "axios";
import Container from "@mui/material/Container";
import MenuItem from "./MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuSkeleton from "./MenuSkeleton";
import { theme } from "../utils/theme";

const Menu = () => {
  const { cartItems } = useContext(CartContext);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    // When cartItems change save the updated cart items to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const fetchDishes = async () => {
    try {
      const response = await axios.get(
        "https://reactdiner.azurewebsites.net/api/dishes"
      );
      setDishes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "1rem",
        marginBottom: "2rem",
        backgroundColor: theme.palette.primaryRed.main,
        borderRadius: "1rem",
        boxShadow: 20,
      }}
    >
      <List>
        {loading || !dishes.length ? (
          <MenuSkeleton />
        ) : (
          dishes.map((dish) => (
            <ListItem key={dish.id}>
              <MenuItem dish={dish} />
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default Menu;
