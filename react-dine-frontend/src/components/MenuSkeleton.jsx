import ListItem from "@mui/material/ListItem";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import { theme } from "../utils/theme";
import { Box } from "@mui/material";

const MenuSkeleton = () => {
  // Create 5 skeletons which represents MenuItem component
  return Array.from({ length: 5 }).map((_, index) => (
    <ListItem key={index}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: "1rem",
          backgroundColor: theme.palette.primaryBeige.main,
          boxShadow: 10,
          borderRadius: "0.5rem",
        }}
      >
        <Skeleton variant="rectangular" width={150} height={150} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "1rem",
            width: "100%",
          }}
        >
          <Skeleton variant="text" sx={{ width: "50%", fontSize: "2.5rem" }} />
          <Skeleton variant="text" sx={{ width: "80%" }} />
          <Skeleton variant="text" sx={{ width: "40%" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Skeleton variant="text" sx={{ width: "10%", fontSize: "2rem" }} />
            <Skeleton variant="rectangular" width={130} height={40} />
          </Box>
        </Box>
      </Card>
    </ListItem>
  ));
};

export default MenuSkeleton;
