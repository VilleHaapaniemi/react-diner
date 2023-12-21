import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import { theme } from "../utils/theme";

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
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        backgroundColor: theme.palette.primaryBeige.main,
        boxShadow: 4,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0.5rem",
          // MUI default Card padding bottom is overrided in utils/theme.jsx (MUI CreateTheme)
        }}
      >
        <Typography variant="h6" sx={{ flex: 5 }}>
          {cartItem.name}
        </Typography>
        <Box
          sx={{
            flex: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              border: `1px solid ${theme.palette.secondaryRed.main}`,
              borderRadius: "8px",
              backgroundColor: theme.palette.primaryBeigeDarker.main,
              boxShadow: 4,
            }}
          >
            <IconButton
              onClick={addItem}
              color="success"
              aria-label="Add one more dish"
            >
              <AddIcon />
            </IconButton>
            <Typography sx={{ padding: "0 1rem" }}>
              {cartItem.quantity}
            </Typography>
            <IconButton
              onClick={decrementQuantity}
              color="error"
              aria-label="Remove one dish"
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="h6" sx={{ flex: 2 }}>
          {(Math.round(cartItem.price * cartItem.quantity * 100) / 100).toFixed(
            2
          )}
          €
        </Typography>
        <IconButton onClick={removeItem} color="error" aria-label="Remove">
          <ClearIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};
export default CartItem;
