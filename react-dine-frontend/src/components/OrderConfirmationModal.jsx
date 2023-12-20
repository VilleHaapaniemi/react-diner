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
import Paper from "@mui/material/Paper";

const OrderConfirmationModal = ({
  isConfirmationModalOpen,
  closeModal,
  onConfirmOrder,
  customerData,
}) => {
  const { cartItems, getTotalPrice } = useContext(CartContext);

  return (
    <Modal
      open={isConfirmationModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography variant="h4">Please confirm your order</Typography>
        <Typography variant="h5">Customer</Typography>
        {isConfirmationModalOpen && (
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{customerData.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>{customerData.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Street</TableCell>
                  <TableCell>{customerData.street}</TableCell>
                </TableRow>
                <TableRow>
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
        <Typography variant="h5">Order</Typography>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Meal</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((row) => (
                <TableRow key={row.id}>
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
        <Typography variant="h5">Total price: {getTotalPrice()}</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onConfirmOrder}>MAKE ORDER</Button>
          <Button onClick={closeModal}>EDIT ORDER</Button>
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
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
