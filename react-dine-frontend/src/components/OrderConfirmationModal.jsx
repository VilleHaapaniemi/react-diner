import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { theme } from "../utils/theme";

const OrderConfirmationModal = ({
  isConfirmationModalOpen,
  closeModal,
  onConfirmOrder,
  customerData,
}) => {
  const { cartItems, getTotalPrice } = useContext(CartContext);

  return (
    <Modal open={isConfirmationModalOpen} onClose={closeModal}>
      <Box sx={modalStyle}>
        <Typography
          variant="h4"
          sx={{ alignSelf: "center", color: theme.palette.primaryBeige.main }}
        >
          Please confirm your order
        </Typography>

        <Box sx={{ marginTop: "0.5rem" }}>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.primaryBeige.main }}
          >
            Customer
          </Typography>
          {isConfirmationModalOpen && (
            <TableContainer
              sx={{
                marginTop: "0.5rem",
                backgroundColor: theme.palette.secondaryBeige.main,
                borderRadius: "0.5rem",
                "& .MuiTableCell-root": {
                  borderBottom: "1px solid",
                  borderColor: theme.palette.primaryRed.main,
                },
              }}
            >
              <Table size="small" aria-label="a dense table">
                <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{customerData.name}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ backgroundColor: theme.palette.primaryBeige.main }}
                  >
                    <TableCell>Email</TableCell>
                    <TableCell>{customerData.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Street</TableCell>
                    <TableCell>{customerData.street}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ backgroundColor: theme.palette.primaryBeige.main }}
                  >
                    <TableCell>Postal-code</TableCell>
                    <TableCell>{customerData["postal-code"]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>City</TableCell>
                    <TableCell>{customerData.city}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>

        <Box sx={{ marginTop: "0.5rem" }}>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.primaryBeige.main }}
          >
            Order
          </Typography>
          <TableContainer
            sx={{
              marginTop: "0.5rem",
              borderRadius: "0.5rem",
              "& .MuiTableCell-root": {
                borderBottom: "1px solid",
                borderColor: theme.palette.primaryRed.main,
              },
            }}
          >
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: theme.palette.primaryBeige.dark,
                  }}
                >
                  <TableCell>Meal</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor:
                        index % 2 === 0
                          ? theme.palette.secondaryBeige.main
                          : theme.palette.primaryBeige.main,
                    }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="right">
                      {row.price * row.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Typography
          variant="h5"
          sx={{
            color: theme.palette.primaryBeige.main,
            alignSelf: "flex-end",
            marginTop: "0.5rem",
          }}
        >
          Total price: {getTotalPrice()}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.5rem",
            marginBottom: "0.3rem",
          }}
        >
          <Button
            sx={{
              color: theme.palette.primaryRed.main,
              backgroundColor: theme.palette.secondaryBeige.main,
              "&:hover": {
                backgroundColor: theme.palette.primaryBeige.main,
              },
            }}
            onClick={closeModal}
          >
            <Typography>EDIT ORDER</Typography>
          </Button>
          <Button
            sx={{
              color: theme.palette.primaryRed.main,
              backgroundColor: theme.palette.primaryBeige.dark,
              "&:hover": {
                backgroundColor: theme.palette.primaryBeige.darkest,
              },
            }}
            onClick={onConfirmOrder}
          >
            <Typography>MAKE ORDER</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OrderConfirmationModal;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: theme.palette.primaryRed.main,
  border: `2px solid ${theme.palette.primaryBeige.main}`,
  borderRadius: "1rem",
  boxShadow: 24,
  padding: "0.5rem 3rem",
  display: "flex",
  flexDirection: "column",
};
