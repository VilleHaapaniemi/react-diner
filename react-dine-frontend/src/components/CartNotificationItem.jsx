import { Box, Typography } from "@mui/material";
import { theme } from "../utils/theme";

const CartNotificationItem = ({ dish }) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <Typography sx={{ color: theme.palette.secondaryRed.main }}>
        {dish.name}
      </Typography>
      <Typography sx={{ color: theme.palette.secondaryRed.main }}>
        X {dish.quantity}
      </Typography>
    </Box>
  );
};

export default CartNotificationItem;
