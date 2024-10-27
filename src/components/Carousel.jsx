import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { TrendingCoins } from '../config/api';
import { CryptoState } from '../CryptoContext';



const useStyles = makeStyles(()=>({
    carousel:{
        height:"50%",
        display:"flex",
        alignItems: "center"

    },
}))

const Carousel = () => {
    const [trending,setTrending] = useState([]);
    const classes = useStyles();    

    const { currency } = CryptoState();
    const fetchCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        setTrending(data);
    }
    console.log(trending);
    // console.log(data);
    
    

    useEffect(()=>{
        fetchCoins();
    },[currency])
  return (
    <div className={classes.carousel}>
        carousel 
    </div>
  )
}

export default Carousel
