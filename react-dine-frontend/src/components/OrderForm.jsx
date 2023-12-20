import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CartContext } from "../contexts/CartContext";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
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
        <Grid sx={{ margin: "1rem", width: "40vw" }} container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">
              Please provide the following information for your order
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: { value: true, message: "Required" } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  variant="outlined"
                  error={errors["name"]}
                  helperText={errors["name"] ? errors["name"].message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
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
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    variant="outlined"
                    error={errors["email"]}
                    helperText={errors["email"] ? errors["email"].message : ""}
                  />
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={8}>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{ required: { value: true, message: "Required" } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="City"
                  variant="outlined"
                  error={errors["city"]}
                  helperText={errors["city"] ? errors["city"].message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="postal-code"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: "Required" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers are allowed",
                },
              }}
              render={({ field }) => (
                <Box>
                  <TextField
                    {...field}
                    fullWidth
                    label="Postal Code"
                    variant="outlined"
                    type="number"
                    error={errors["postal-code"]}
                    helperText={
                      errors["postal-code"] ? errors["postal-code"].message : ""
                    }
                  />
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={8}>
            <Controller
              name="street"
              control={control}
              defaultValue=""
              rules={{ required: { value: true, message: "Required" } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Street"
                  variant="outlined"
                  error={errors["street"]}
                  helperText={errors["street"] ? errors["street"].message : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex" }}>
            <Button type="submit" variant="contained">
              MAKE ORDER
            </Button>
          </Grid>
        </Grid>
      </form>

      <OrderConfirmationModal
        isConfirmationModalOpen={isConfirmationModalOpen}
        closeModal={handleCloseModal}
        onConfirmOrder={submitOrder}
        customerData={customerData}
      />
    </>
  );
};

export default OrderForm;
