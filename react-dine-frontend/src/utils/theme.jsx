import { createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import {
  primaryRed,
  secondaryRed,
  primaryBeige,
  secondaryBeige,
} from "./colors";

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
  palette: {
    primaryRed: primaryRed,
    secondaryRed: secondaryRed,
    primaryBeige: primaryBeige,
    secondaryBeige: secondaryBeige,
  },
});

export const formTheme = createTheme({
  typography: {
    fontSize: 15,
    fontWeightRegular: 500,
    fontFamily: "Cardo",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "black",
          "--TextField-brandBorderHoverColor": "black",
          "--TextField-brandBorderFocusedColor": "black",
          "& label.Mui-focused": {
            color: "black",
          },
          backgroundColor: theme.palette.secondaryBeige.main,
          "& .MuiFormHelperText-root": {
            paddingLeft: "0.3rem",
            margin: 0,
            backgroundColor: theme.palette.primaryBeige.main,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "black",
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "#767f84",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "black",
          },
        },
      },
    },
  },
});
