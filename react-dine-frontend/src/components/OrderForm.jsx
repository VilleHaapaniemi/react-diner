import { useContext, useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { CartContext } from "../contexts/CartContext";
import axios from "axios";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import OrderConfirmationModal from "./OrderConfirmationModal";
import { theme, formTheme } from "../utils/theme";
import { ThemeProvider } from "@mui/material/styles";

const OrderForm = ({ orderSubmitted }) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState();
  const {
    handleSubmit,
    control,
    formState: { errors, submitCount, isValid },
  } = useForm();
  const { getCartItemsIdAndQuantity } = useContext(CartContext);
  const pageRef = useRef(null);

  useEffect(() => {
    // If form have validation errors scroll the page to page bottom to set focus on form
    if (!isValid && submitCount > 0) {
      pageRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [submitCount, isValid]);

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
        "https://reactdiner.azurewebsites.net/api/orders",
        orderData
      );
      console.log(response.data);
      orderSubmitted({
        result: "success",
        message: "Your order has been received and is being prepared",
      });
    } catch (error) {
      console.error(error);
      if (error.response) {
        orderSubmitted({
          result: "error",
          message:
            "We're sorry, but there seems to be an issue with our server",
        });
      } else if (error.request) {
        orderSubmitted({
          result: "error",
          message:
            "We're sorry, but there seems to be an issue with your order. Please check your information and try again",
        });
      } else {
        orderSubmitted({
          result: "error",
          message: "We're sorry, unknown error occured",
        });
      }
    }
  };

  const handleCloseModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Container
        maxWidth="md"
        ref={pageRef}
        sx={{
          backgroundColor: theme.palette.primaryRed.main,
          padding: "1rem",
          marginTop: "1rem",
          marginBottom: "3rem",
          borderRadius: "1rem",
          boxShadow: 20,
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: theme.palette.primaryBeige.main }}
        >
          Please provide the following information for your order
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmitCustomerForm)}
          noValidate
          autoComplete="off"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid
            sx={{
              margin: "1rem",
              width: "90%",
              backgroundColor: theme.palette.primaryBeige.main,
              padding: "1rem",
              borderRadius: "1rem",
            }}
            container
            spacing={1}
          >
            <Grid item xs={5}>
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
                    error={errors["name"] ? true : false}
                    helperText={errors["name"] ? errors["name"].message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={7}>
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
                      error={errors["email"] ? true : false}
                      helperText={
                        errors["email"] ? errors["email"].message : ""
                      }
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid item xs={5}>
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
                    error={errors["city"] ? true : false}
                    helperText={errors["city"] ? errors["city"].message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={5}>
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
                    error={errors["street"] ? true : false}
                    helperText={
                      errors["street"] ? errors["street"].message : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
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
                      error={errors["postal-code"] ? true : false}
                      helperText={
                        errors["postal-code"]
                          ? errors["postal-code"].message
                          : ""
                      }
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.secondaryRed.main,
                  color: theme.palette.primaryBeige.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primaryRed.main,
                  },
                }}
              >
                <Typography>MAKE ORDER</Typography>
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
      </Container>
    </ThemeProvider>
  );
};

export default OrderForm;
