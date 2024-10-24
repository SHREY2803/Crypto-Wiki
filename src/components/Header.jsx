import React from "react";
import Appbar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { dark } from "@mui/material/styles/createPalette";


const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Rubik",
    fontWeight: "bolder",
    cursor:"pointer",
  },
}));

const Header = () => {
const classes = useStyles();
const navigate = useNavigate(); 

const handleTitleClick = () => {
  navigate('/');
};

const darkTheme = createTheme({
  palette: {
    primary:{
      main:"#fff",
    },
    mode:"dark",
  },
});

  return (
    <ThemeProvider theme={darkTheme}>
    <Appbar color="tranparent" position="static">
      <Container>
        <Toolbar>
          <Typography onClick={handleTitleClick} className={classes.title}
          variant="h6">Crypto Hunter</Typography>
          <Select
            variant="outlined"
            style={{ 
              width: 100, 
              height: 40, 
              marginLeft: 15, }}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR </MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </Appbar>
    </ThemeProvider>
  );
};

export default Header;
