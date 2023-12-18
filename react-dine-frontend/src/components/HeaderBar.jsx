import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const HeaderBar = () => {
  const navigate = useNavigate();

  return (
    <header>
      <AppBar position="fixed">
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button
              size="large"
              sx={{ color: "red", backgroundColor: "yellow" }}
              startIcon={<RestaurantIcon />}
              onClick={() => navigate("/")}
            >
              <Typography>Restaurant</Typography>
            </Button>
            <Button
              size="large"
              sx={{ color: "red", backgroundColor: "yellow" }}
              startIcon={<ShoppingCartIcon />}
              onClick={() => navigate("/cart")}
            >
              <Typography>Cart</Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default HeaderBar;
