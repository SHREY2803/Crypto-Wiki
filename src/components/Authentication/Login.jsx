import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { CryptoState } from "../../CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
        type: "success",
      });
    } catch (error) {
      // Check for invalid credentials error
      if (error.code === "auth/invalid-credential") {
        setAlert({
          open: true,
          message: "Invalid credentials",
          type: "error",
        });
      } else {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    }
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        label="Enter Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Enter Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassWord(e.target.value)}
        fullWidth
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        style={{
          fontWeight: "bold",
          backgroundColor: "yellow",
        }}
        fullWidth
      >
        LogIn
      </Button>
    </Box>
  );
};

export default Login;
