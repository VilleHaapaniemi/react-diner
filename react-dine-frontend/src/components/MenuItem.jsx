import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

const MenuItem = ({ dish }) => {
  const imgUrl = `http://localhost:5000/${dish.image}`;
  const { addToCart } = useContext(CartContext);

  const addDishToCart = () => {
    addToCart(dish);
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <CardMedia component="img" sx={{ width: 150 }} src={imgUrl} alt="Dish" />
      <CardContent>
        <Typography>{dish.name}</Typography>
        <Typography>{dish.description}</Typography>
        <Typography>{dish.price}</Typography>
        <Button onClick={addDishToCart}>Add to cart</Button>
      </CardContent>
    </Card>
  );
};
export default MenuItem;
