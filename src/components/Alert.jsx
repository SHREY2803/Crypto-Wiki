import React from "react";
import { CryptoState } from "../CryptoContext";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { Box, Typography } from "@mui/material";

const Alert = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Centered position
    >
      <SnackbarContent
        style={{
          backgroundColor: alert.type === "success" ? "green" : "red",
          display: "flex",
          alignItems: "center",
        }}
        message={
          <Box display="flex" alignItems="center">
            <Typography variant="body1">{alert.message}</Typography>
          </Box>
        }
      />
    </Snackbar>
  );
};

export default Alert;
