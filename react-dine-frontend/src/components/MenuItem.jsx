import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Typography, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { theme } from "../utils/theme";

const MenuItem = ({ dish }) => {
  const imgUrl = `http://localhost:5000/${dish.image}`;
  const { addToCart } = useContext(CartContext);

  const addDishToCart = () => {
    addToCart(dish);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: "1rem",
        backgroundColor: theme.palette.primaryBeige.main,
        boxShadow: 10,
        borderRadius: "0.5rem",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150, borderRadius: "1rem" }}
        src={imgUrl}
        alt="Dish"
      />
      <CardContent sx={{ pt: 0, width: "100%" }}>
        <Typography variant="h4">{dish.name}</Typography>
        <Typography variant="body1" sx={{ fontStyle: "italic" }}>
          {dish.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "1em",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">{dish.price} €</Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondaryRed.main,
              color: theme.palette.primaryBeige.main,
              "&:hover": {
                backgroundColor: theme.palette.primaryRed.main,
              },
            }}
            onClick={addDishToCart}
          >
            <Typography>ADD TO CART</Typography>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
export default MenuItem;
