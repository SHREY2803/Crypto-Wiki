import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import React from 'react';
import Typography from "@mui/material/Typography";
import CrypToImg from "../../assets/crypto_bg_img.jpg"; 
import SecondImg from "../../assets/banner2.jpg"
import Carousel from "../Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: `url(${SecondImg})`, 
  },

  bannerContent:{
    height: 400, 
    display: "flex",
    flexDirection:"column",
    paddingTop:25,
    justifyContent:"space-around", 
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
        <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Rubik",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Rubik",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
