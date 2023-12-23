import { useState } from "react";
import Cart from "../components/Cart";
import OrderForm from "../components/OrderForm";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Typography } from "@mui/material";

const CartPage = () => {
  const [orderSnackbar, setOrderSnackbar] = useState({
    open: false,
    severity: "info",
    message: "",
  });

  const handleOrderSubmitted = (submitResult) => {
    setOrderSnackbar({
      open: true,
      severity: submitResult.result,
      message: submitResult.message,
    });
  };

  const handleCloseOrderSuccess = () => {
    setOrderSnackbar((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <>
      <Cart />
      <OrderForm orderSubmitted={handleOrderSubmitted} />
      <Snackbar open={orderSnackbar.open} onClose={handleCloseOrderSuccess}>
        <Alert
          onClose={handleCloseOrderSuccess}
          variant="filled"
          severity={orderSnackbar.severity}
          sx={{ width: "100%" }}
        >
          <Typography>{orderSnackbar.message}</Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default CartPage;
