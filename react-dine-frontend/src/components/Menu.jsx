import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import MenuItem from "./MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const Menu = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dishes");
      setDishes(response.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: "whitesmoke" }}>
      <List>
        {dishes.map((dish) => (
          <ListItem key={dish.id}>
            <MenuItem dish={dish} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Menu;
