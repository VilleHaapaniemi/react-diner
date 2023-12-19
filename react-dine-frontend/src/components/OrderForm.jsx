import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { CartContext } from "../contexts/CartContext";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";

const OrderForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { getCartItemsIdAndQuantity } = useContext(CartContext);

  const onSubmit = async (customerData) => {
    // Merge customer data from form and Cart items from CartContext
    const orderData = {
      order: {
        customer: customerData,
        items: getCartItemsIdAndQuantity(),
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
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
  );
};

export default OrderForm;
