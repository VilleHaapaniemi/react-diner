import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { theme } from "../utils/theme";

const HeaderBar = () => {
  const navigate = useNavigate();
  const { getCartQuantityCount, cartItems } = useContext(CartContext);
  const [cartFlash, setCartFlash] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (!initialRender) {
      setCartFlash(true);
      setTimeout(() => {
        setCartFlash(false);
      }, 2000);
    }
    setInitialRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <header>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: theme.palette.primaryRed.main }}
      >
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button
              size="large"
              sx={{
                color: theme.palette.primaryRed.main,
                backgroundColor: theme.palette.primaryBeige.main,
                "&:hover": {
                  backgroundColor: theme.palette.primaryBeige.dark,
                },
              }}
              startIcon={<RestaurantIcon />}
              onClick={() => navigate("/")}
            >
              <Typography>MENU</Typography>
            </Button>
            <Button
              size="large"
              sx={{
                color: theme.palette.primaryRed.main,
                backgroundColor: cartFlash
                  ? theme.palette.primaryBeige.darkest
                  : theme.palette.primaryBeige.main,
                "&:hover": {
                  backgroundColor: theme.palette.primaryBeige.dark,
                },
              }}
              startIcon={<ShoppingCartIcon />}
              onClick={() => navigate("/cart")}
            >
              <Typography>
                Cart
                {getCartQuantityCount() > 0
                  ? `(${getCartQuantityCount()})`
                  : ""}
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default HeaderBar;
