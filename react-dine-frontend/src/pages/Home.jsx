import { Typography } from "@mui/material";
import Menu from "../components/Menu";
import { theme } from "../utils/theme";

const Home = () => {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          textDecoration: "underline",
          fontStyle: "italic",
          color: theme.palette.secondaryRed.main,
        }}
      >
        Menu
      </Typography>
      <Menu />
    </>
  );
};

export default Home;
