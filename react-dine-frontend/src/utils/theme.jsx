import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontSize: 15,
    fontWeightRegular: 500,
    fontFamily: "Cardo",
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: "0.5rem",
          },
        },
      },
    },
  },
});
