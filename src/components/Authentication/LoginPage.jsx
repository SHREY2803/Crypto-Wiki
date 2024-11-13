import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from "./Login";
import SignUp from "./SignUp";
import { makeStyles } from "@mui/styles";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase";
import { CryptoState } from "../../CryptoContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 4,
  color: "white",
  fontFamily: "Rubik",
};

const useStyles = makeStyles({
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    marginLeft: 15,
  },
});

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [profilePic, setProfilePic] = React.useState(null);
  const { setAlert } = CryptoState();

  const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign In successful. Welcome ${res.user.email}`,
          type:"success",
        });
        setProfilePic(res.user.photoURL);  // Set profile picture URL
        handleClose();
      })
      .catch((err) => {
        setAlert({
          open: true,
          message: err.message,
          type: "error",
        });
      });
  };

  return (
    <div>
      {profilePic ? (
        <img
          src={profilePic}
          alt="Profile"
          className={classes.profilePicture}
        />
      ) : (
        <Button
          onClick={handleOpen}
          variant="contained"
          style={{
            width: 95,
            height: 40,
            marginLeft: 15,
            backgroundColor: "yellow",
          }}
        >
          Sign In
        </Button>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              position="static"
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 1 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </Box>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}

            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{
                  width: "100%",
                  outline: "none",
                }}
                onClick={signInWithGoogle}
              ></GoogleButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
