import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import CartPage from "./pages/CartPage";
import RootLayout from "./pages/RootLayout";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <CartPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
