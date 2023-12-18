import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const MenuItem = ({ dish }) => {
  const imgUrl = `http://localhost:5000/${dish.image}`;
  return (
    <Card sx={{ display: "flex", flexDirection: "row" }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        src={imgUrl}
        alt="Live from space album cover"
      />
      <Typography>{dish.name}</Typography>
    </Card>
  );
};
export default MenuItem;
