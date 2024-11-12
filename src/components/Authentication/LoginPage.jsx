import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'; 
import Login from "./Login";
import SignUp from "./SignUp";


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
  color:"white"
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0); 

//   console.log(value);
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
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
                style={{borderRadius:1}}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </Box>
            {value ===0 && <Login handleClose={handleClose}/>}
            {value ===1 && <SignUp handleClose={handleClose}/>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
