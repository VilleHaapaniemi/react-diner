import Cart from "../components/Cart";
import OrderForm from "../components/OrderForm";
import { Box } from "@mui/material";

const CartPage = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Cart />
        <OrderForm />
      </Box>
    </>
  );
};

export default CartPage;
