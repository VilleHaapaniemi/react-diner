import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CartContext } from "../contexts/CartContext";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import OrderConfirmationModal from "./OrderConfirmationModal";

const OrderForm = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { getCartItemsIdAndQuantity } = useContext(CartContext);

  const onSubmitCustomerForm = (customerData) => {
    setCustomerData(customerData);
    setIsConfirmationModalOpen(true);
  };

  // This function is called after OrderConfirmationModal is confirmed
  const submitOrder = async () => {
    setIsConfirmationModalOpen(false);
    // Merge customer data and cart items
    const orderData = {
      order: {
        customer: customerData,
        items: getCartItemsIdAndQuantity, // Returns item array including only item Id's and quantities
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitCustomerForm)}
        noValidate
        autoComplete="off"
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: { value: true, message: "Required" } }}
          render={({ field }) => (
            <TextField {...field} label="Name" variant="outlined" />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Required" },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Must be valid email address structure
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <Box>
              <TextField {...field} label="Email" variant="outlined" />
              {errors["email"] && <p>{errors["email"].message}</p>}
            </Box>
          )}
        />
        <Controller
          name="street"
          control={control}
          defaultValue=""
          rules={{ required: { value: true, message: "Required" } }}
          render={({ field }) => (
            <TextField {...field} label="Street" variant="outlined" />
          )}
        />
        <Controller
          name="postal-code"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Required" },
            pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" },
          }}
          render={({ field }) => (
            <Box>
              <TextField
                {...field}
                label="Postal Code"
                variant="outlined"
                type="number"
              />
              {errors["postal-code"] && (
                <Typography>{errors["postal-code"].message}</Typography>
              )}
            </Box>
          )}
        />
        <Controller
          name="city"
          control={control}
          defaultValue=""
          rules={{ required: { value: true, message: "Required" } }}
          render={({ field }) => (
            <TextField {...field} label="City" variant="outlined" />
          )}
        />
        <Button type="submit" variant="contained">
          SUBMIT
        </Button>
      </form>

      <OrderConfirmationModal
        isConfirmationModalOpen={isConfirmationModalOpen}
        onCloseModal={handleCloseModal}
        onConfirmOrder={submitOrder}
        customerData={customerData}
      />
    </>
  );
};

export default OrderForm;
